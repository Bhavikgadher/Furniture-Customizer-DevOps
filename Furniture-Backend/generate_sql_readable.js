const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const models = require('./src/database/models/index.js');
const { sequelize } = models;

const RECORDS_PER_TABLE = 25;

const faker = {
  words: ['Experience', 'Crafted', 'Modern', 'Rustic', 'Elegant', 'Comfortable', 'Sleek', 'Premium', 'Minimalist', 'Classic', 'Vintage', 'Chic', 'Cozy', 'Stylish', 'Contemporary', 'Luxury', 'Sturdy'],
  sentences: ['A perfect addition to your home.', 'Designed with comfort and style.', 'Crafted with precision.', 'A timeless design.', 'Experience the ultimate relaxation.', 'Built to last with premium materials.', 'An extraordinary piece of furniture.', 'Enhance your living space.'],
  names: ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa', 'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley', 'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle', 'Kenneth', 'Dorothy', 'Kevin', 'Carol', 'Brian', 'Amanda', 'George', 'Melissa', 'Edward', 'Deborah', 'Ronald', 'Stephanie', 'Timothy', 'Rebecca', 'Jason', 'Sharon', 'Jeffrey', 'Laura', 'Ryan', 'Cynthia', 'Jacob', 'Kathleen', 'Gary', 'Amy', 'Nicholas', 'Shirley', 'Eric', 'Angela', 'Jonathan', 'Helen', 'Stephen', 'Anna', 'Larry', 'Brenda', 'Justin', 'Pamela', 'Scott', 'Nicole', 'Brandon', 'Emma', 'Benjamin', 'Samantha', 'Samuel', 'Katherine', 'Gregory', 'Christine', 'Frank', 'Debra', 'Alexander', 'Rachel', 'Raymond', 'Catherine', 'Patrick', 'Carolyn', 'Jack', 'Janet', 'Dennis', 'Ruth', 'Jerry', 'Maria', 'Tyler', 'Heather', 'Aaron', 'Diane', 'Jose', 'Virginia', 'Adam', 'Julie', 'Henry', 'Joyce', 'Nathan', 'Victoria', 'Douglas', 'Olivia', 'Zachary', 'Kelly', 'Peter', 'Christina', 'Kyle', 'Lauren', 'Walter', 'Joan', 'Ethan', 'Evelyn', 'Jeremy', 'Judith', 'Harold', 'Megan', 'Keith', 'Cheryl', 'Christian', 'Andrea', 'Roger', 'Hannah', 'Noah', 'Martha', 'Gerald', 'Jacqueline', 'Carl', 'Frances', 'Terry', 'Gloria', 'Sean', 'Ann', 'Austin', 'Teresa', 'Arthur', 'Kathryn', 'Lawrence', 'Sara', 'Jesse', 'Janice', 'Dylan', 'Jean', 'Bryan', 'Alice', 'Joe', 'Madison', 'Jordan', 'Doris', 'Billy', 'Abigail', 'Bruce', 'Julia', 'Albert', 'Judy', 'Willie', 'Grace', 'Gabriel', 'Denise', 'Logan', 'Amber', 'Alan', 'Marilyn', 'Juan', 'Beverly', 'Wayne', 'Danielle', 'Roy', 'Theresa', 'Ralph', 'Sophia', 'Elijah', 'Marie', 'Kevin', 'Diana', 'Louis', 'Brittany', 'Zachary', 'Natalie', 'Eugene', 'Isabella', 'Vincent', 'Charlotte', 'Russell', 'Rose', 'Dylan', 'Alexis', 'Louis', 'Kayla'],
  cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'San Francisco', 'Charlotte', 'Indianapolis', 'Seattle', 'Denver', 'Washington'],
  states: ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'MI', 'OH', 'NC', 'FL', 'CO', 'WA', 'GA'],
  streets: ['Main St.', 'Oak St.', 'Maple St.', 'Pine St.', 'Cedar St.', 'Elm St.', 'Washington St.', 'Lake St.', 'Hill St.', 'Park St.'],
  getRandom: (arr) => arr[Math.floor(Math.random() * arr.length)],
  getWord: () => faker.getRandom(faker.words),
  getSentence: () => faker.getRandom(faker.sentences),
  getName: () => `${faker.getRandom(faker.names)} ${faker.getRandom(faker.names)}`,
  getEmail: () => `${faker.getRandom(faker.names).toLowerCase()}.${faker.getRandom(faker.names).toLowerCase()}${Math.floor(Math.random() * 1000)}@example.com`,
  getPhone: () => `555-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
  getAddress: () => `${Math.floor(10 + Math.random() * 9000)} ${faker.getRandom(faker.names)} St., ${faker.getRandom(faker.cities)}, ${faker.getRandom(faker.states)}`
};

const generatedIds = {};

function getRandomGeneratedId(tableName) {
  const ids = generatedIds[tableName];
  if (!ids || ids.length === 0) return null;
  return ids[Math.floor(Math.random() * ids.length)];
}

const tableOrder = [
  'roles', 'permissions', 'users', 'role_permissions', 'user_addresses',
  'password_resets', 'refresh_tokens', 'vendors', 'designers', 'categories',
  'materials', 'colors', 'fabrics', 'sizes', 'add_ons', 'furniture_models',
  'saved_designs', 'saved_design_addons', 'carts', 'cart_items', 'orders',
  'order_items', 'payments', 'reviews', 'coupons', 'coupon_usages',
  'inventory_logs', 'wishlists', 'wishlist_items', 'notifications', 'consultations'
];

async function generateSQL() {
  let sql = '-- Generated Human-Readable Dummy Data for Furniture DB\n\n';

  for (const tableName of tableOrder) {
    const model = Object.values(models).find(m => m.tableName === tableName || (m.options && m.options.tableName === tableName));
    if (!model) {
      console.warn(`Model not found for table ${tableName}`);
      continue;
    }

    generatedIds[tableName] = [];
    const attributes = model.rawAttributes;

    sql += `-- Table: ${tableName}\n`;
    for (let i = 0; i < RECORDS_PER_TABLE; i++) {
        let columns = [];
        let values = [];

        const id = uuidv4();
        generatedIds[tableName].push(id);

        for (const [key, attribute] of Object.entries(attributes)) {
          let fieldName = attribute.field || key;
          let val = null;

          if (attribute.primaryKey || key === 'id') {
            val = `'${id}'`;
            if (tableName === 'roles' && i === 0) val = `'${uuidv4()}'`; // Just distinct
          } else if (attribute.references) {
             const refTable = attribute.references.model;
             const refTableName = typeof refTable === 'string' ? refTable : refTable.tableName;
             const refId = getRandomGeneratedId(refTableName) || getRandomGeneratedId(fieldName.replace('_id', 's'));
             if (refId) {
                val = `'${refId}'`;
             } else {
                val = `'${uuidv4()}'`; // Fallback, shouldn't happen with correct order
             }
          } else if (key === 'createdAt' || key === 'updatedAt' || key === 'deletedAt' || fieldName === 'created_at' || fieldName === 'updated_at' || fieldName === 'deleted_at') {
             val = `CURRENT_TIMESTAMP`;
          } else if (attribute.type.key === 'STRING' || attribute.type.key === 'TEXT') {
              if (fieldName.includes('email')) val = `'${faker.getEmail()}'`;
              else if (fieldName.includes('password')) val = `'$2y$10$abcdefghijklmnopqrstuv'`;
              else if (fieldName.includes('first_name') || fieldName.includes('last_name') || fieldName.includes('name')) {
                  if (tableName === 'users' && i === 0 && fieldName === 'name') val = `'Admin'`;
                  else val = `'${faker.getWord()} ${faker.getWord()}'`;
              }
              else if (fieldName.includes('description') || fieldName.includes('bio') || fieldName.includes('summary')) val = `'${faker.getSentence()}'`;
              else if (fieldName.includes('phone')) val = `'${faker.getPhone()}'`;
              else if (fieldName.includes('address') || fieldName.includes('street')) val = `'${Math.floor(10+Math.random()*900)} ${faker.getWord()} St.'`;
              else if (fieldName.includes('city')) val = `'${faker.getRandom(faker.cities)}'`;
              else if (fieldName.includes('state')) val = `'${faker.getRandom(faker.states)}'`;
              else if (fieldName.includes('zip') || fieldName.includes('postal')) val = `'${Math.floor(10000 + Math.random() * 90000)}'`;
              else if (fieldName.includes('country')) val = `'USA'`;
              else if (fieldName.includes('image') || fieldName.includes('thumbnail') || fieldName.includes('url')) val = `'https://images.unsplash.com/photo-${Math.floor(1000000+Math.random()*9000000)}-${Math.floor(100+Math.random()*900)}'`;
              else if (fieldName.includes('token') || fieldName.includes('code')) val = `'${faker.getWord().toUpperCase()}_${Math.floor(Math.random() * 1000)}'`;
              else if (fieldName.includes('status')) val = `'Pending'`;
              else if (fieldName.includes('type')) val = `'Standard'`;
              else if (fieldName.includes('hex')) val = `'#${Math.floor(Math.random()*16777215).toString(16)}'`;
              else val = `'${faker.getWord()}'`;

              if (tableName === 'users' && i === 0 && fieldName === 'email') val = `'Admin@gmail.com'`;
          } else if (attribute.type.key === 'INTEGER' || attribute.type.key === 'FLOAT' || attribute.type.key === 'DECIMAL' || attribute.type.key === 'DOUBLE') {
             if (fieldName.includes('price') || fieldName.includes('amount') || fieldName.includes('total')) val = (Math.random() * 500 + 10).toFixed(2);
             else if (fieldName.includes('rating')) val = (Math.random() * 4 + 1).toFixed(1);
             else if (fieldName.includes('quantity') || fieldName.includes('stock')) val = Math.floor(Math.random() * 100);
             else val = Math.floor(Math.random() * 100);
          } else if (attribute.type.key === 'BOOLEAN') {
             val = Math.random() > 0.5 ? 'true' : 'false';
          } else if (attribute.type.key === 'DATE') {
             val = `CURRENT_TIMESTAMP`;
          } else {
             val = `'${faker.getWord()}'`;
          }
          
          columns.push(`"${fieldName}"`);
          values.push(val);
        }
        
        sql += `INSERT INTO "${tableName}" (${columns.join(', ')}) VALUES (${values.join(', ')});\n`;
    }
    sql += '\n';
  }
  
  fs.writeFileSync('../seed_25.sql', sql);
  console.log('Successfully generated updated seed_25.sql in root directory.');
}

generateSQL();
