import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Check database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to PostgreSQL database');
    release();
  }
});

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    
    req.user = user;
    next();
  });
};

// Admin middleware
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Admin access required' });
  }
};

// Routes

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const userExists = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, is_admin',
      [name, email, hashedPassword]
    );
    
    const user = {
      id: result.rows[0].id,
      name: result.rows[0].name,
      email: result.rows[0].email,
      isAdmin: result.rows[0].is_admin
    };
    
    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const user = result.rows[0];
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.is_admin },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.is_admin
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Product routes
app.get('/api/products', async (req, res) => {
  try {
    const { category, featured, search, limit, page = 1 } = req.query;
    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];
    let paramIndex = 1;
    
    if (category) {
      query += ` AND $${paramIndex} = ANY(categories)`;
      params.push(category);
      paramIndex++;
    }
    
    if (featured === 'true') {
      query += ` AND featured = $${paramIndex}`;
      params.push(true);
      paramIndex++;
    }
    
    if (search) {
      query += ` AND (name ILIKE $${paramIndex} OR artist ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }
    
    // Add pagination
    const pageSize = limit ? parseInt(limit) : 10;
    const offset = (parseInt(page) - 1) * pageSize;
    
    query += ` ORDER BY created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(pageSize, offset);
    
    const result = await pool.query(query, params);
    
    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) FROM products WHERE 1=1';
    let countParams = [];
    let countParamIndex = 1;
    
    if (category) {
      countQuery += ` AND $${countParamIndex} = ANY(categories)`;
      countParams.push(category);
      countParamIndex++;
    }
    
    if (featured === 'true') {
      countQuery += ` AND featured = $${countParamIndex}`;
      countParams.push(true);
      countParamIndex++;
    }
    
    if (search) {
      countQuery += ` AND (name ILIKE $${countParamIndex} OR artist ILIKE $${countParamIndex} OR description ILIKE $${countParamIndex})`;
      countParams.push(`%${search}%`);
      countParamIndex++;
    }
    
    const countResult = await pool.query(countQuery, countParams);
    const totalItems = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalItems / pageSize);
    
    res.json({
      products: result.rows,
      pagination: {
        page: parseInt(page),
        pageSize,
        totalItems,
        totalPages
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin product routes
app.post('/api/products', authenticateToken, isAdmin, async (req, res) => {
  try {
    const {
      name,
      artist,
      description,
      price,
      sizes,
      categories,
      tags,
      images,
      stock,
      featured
    } = req.body;
    
    const result = await pool.query(
      `INSERT INTO products (
        name, artist, description, price, sizes, categories, tags, images, stock, featured
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [name, artist, description, price, JSON.stringify(sizes), categories, tags, images, stock, featured]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/products/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      artist,
      description,
      price,
      sizes,
      categories,
      tags,
      images,
      stock,
      featured
    } = req.body;
    
    const result = await pool.query(
      `UPDATE products SET
        name = $1, artist = $2, description = $3, price = $4, 
        sizes = $5, categories = $6, tags = $7, images = $8,
        stock = $9, featured = $10, updated_at = NOW()
      WHERE id = $11 RETURNING *`,
      [name, artist, description, price, JSON.stringify(sizes), categories, tags, images, stock, featured, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/products/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Order routes
app.post('/api/orders', authenticateToken, async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      paymentMethod,
      paymentId,
      itemsTotal,
      shippingTotal,
      taxTotal,
      total
    } = req.body;
    
    const result = await pool.query(
      `INSERT INTO orders (
        user_id, items, shipping_address, payment_method, payment_id,
        items_total, shipping_total, tax_total, total, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        req.user.id,
        JSON.stringify(items),
        JSON.stringify(shippingAddress),
        paymentMethod,
        paymentId,
        itemsTotal,
        shippingTotal,
        taxTotal,
        total,
        'pending'
      ]
    );
    
    // Update product stock
    for (const item of items) {
      await pool.query(
        'UPDATE products SET stock = stock - $1 WHERE id = $2',
        [item.quantity, item.productId]
      );
    }
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/orders', authenticateToken, async (req, res) => {
  try {
    let query = 'SELECT * FROM orders';
    const params = [];
    
    if (!req.user.isAdmin) {
      query += ' WHERE user_id = $1';
      params.push(req.user.id);
    }
    
    query += ' ORDER BY created_at DESC';
    
    const result = await pool.query(query, params);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/orders/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    const order = result.rows[0];
    
    // Check if user is authorized to view this order
    if (!req.user.isAdmin && order.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order status (admin only)
app.put('/api/orders/:id/status', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    let updateFields = { status };
    
    // Update additional fields based on status
    if (status === 'shipped') {
      updateFields.is_shipped = true;
      updateFields.shipped_at = new Date();
    } else if (status === 'delivered') {
      updateFields.is_delivered = true;
      updateFields.delivered_at = new Date();
    }
    
    // Build dynamic query
    let query = 'UPDATE orders SET';
    const queryParams = [];
    let paramIndex = 1;
    
    Object.entries(updateFields).forEach(([key, value], index) => {
      // Convert camelCase to snake_case for DB
      const dbField = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      
      query += ` ${dbField} = $${paramIndex}`;
      if (index < Object.entries(updateFields).length - 1) {
        query += ',';
      }
      queryParams.push(value);
      paramIndex++;
    });
    
    query += ` WHERE id = $${paramIndex} RETURNING *`;
    queryParams.push(id);
    
    const result = await pool.query(query, queryParams);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PayPal webhook endpoint
app.post('/api/webhooks/paypal', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const event = req.body;
    
    // Verify webhook signature (in a production app)
    // const signature = req.headers['paypal-transmission-sig'];
    // const verified = verifyPayPalWebhook(event, signature);
    
    // if (!verified) {
    //   return res.status(400).send('Webhook signature verification failed');
    // }
    
    // Process based on event type
    if (event.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
      const orderId = event.resource.invoice_id; // Assuming you set this when creating payment
      
      // Update order status
      await pool.query(
        'UPDATE orders SET is_paid = $1, paid_at = $2, status = $3 WHERE id = $4',
        [true, new Date(), 'processing', orderId]
      );
    }
    
    res.status(200).send('Webhook received');
  } catch (error) {
    console.error('PayPal webhook error:', error);
    res.status(500).send('Webhook processing failed');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});