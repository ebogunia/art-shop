-- Create database (run this separately on your PostgreSQL server)
-- CREATE DATABASE art_prints;

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  sizes JSONB NOT NULL DEFAULT '[]',
  categories TEXT[] NOT NULL DEFAULT '{}',
  tags TEXT[] NOT NULL DEFAULT '{}',
  images TEXT[] NOT NULL DEFAULT '{}',
  stock INTEGER NOT NULL DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  items JSONB NOT NULL,
  shipping_address JSONB NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  payment_id VARCHAR(255),
  items_total DECIMAL(10, 2) NOT NULL,
  shipping_total DECIMAL(10, 2) NOT NULL,
  tax_total DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  is_paid BOOLEAN DEFAULT FALSE,
  paid_at TIMESTAMP,
  is_shipped BOOLEAN DEFAULT FALSE,
  shipped_at TIMESTAMP,
  is_delivered BOOLEAN DEFAULT FALSE,
  delivered_at TIMESTAMP,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Sample data for products (optional)
INSERT INTO products (
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
) VALUES (
  'Abstract Composition',
  'Elena Martin',
  'A vibrant abstract composition exploring color and form. This piece features bold, gestural brushstrokes and a harmonious color palette that creates dynamic visual tension.',
  85.00,
  '[{"name":"Small","dimensions":"8×10″","price":85},{"name":"Medium","dimensions":"12×16″","price":135},{"name":"Large","dimensions":"18×24″","price":195}]',
  ARRAY['abstract', 'modern'],
  ARRAY['colorful', 'geometric', 'bold'],
  ARRAY['https://images.pexels.com/photos/1568607/pexels-photo-1568607.jpeg?auto=compress&cs=tinysrgb&w=1600', 'https://images.pexels.com/photos/1570779/pexels-photo-1570779.jpeg?auto=compress&cs=tinysrgb&w=1600'],
  12,
  TRUE
);

INSERT INTO products (
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
) VALUES (
  'Ocean Sunset',
  'David Chen',
  'A peaceful seascape capturing the golden colors of sunset over the ocean. This serene landscape evokes a sense of calm and contemplation as the sun dips below the horizon.',
  95.00,
  '[{"name":"Small","dimensions":"8×10″","price":95},{"name":"Medium","dimensions":"12×16″","price":145},{"name":"Large","dimensions":"18×24″","price":215}]',
  ARRAY['landscape', 'nature'],
  ARRAY['ocean', 'sunset', 'peaceful'],
  ARRAY['https://images.pexels.com/photos/1535162/pexels-photo-1535162.jpeg?auto=compress&cs=tinysrgb&w=1600', 'https://images.pexels.com/photos/2480816/pexels-photo-2480816.jpeg?auto=compress&cs=tinysrgb&w=1600'],
  8,
  TRUE
);

-- Create index for faster lookups
CREATE INDEX idx_products_categories ON products USING GIN (categories);
CREATE INDEX idx_products_featured ON products (featured);
CREATE INDEX idx_orders_user_id ON orders (user_id);
CREATE INDEX idx_orders_status ON orders (status);