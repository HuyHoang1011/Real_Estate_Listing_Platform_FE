import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Seed user
  const hashedAdminPassword = await bcrypt.hash('admin123', 10);
  const hashedUserPassword = await bcrypt.hash('user123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@example.com',
      password: hashedAdminPassword,
      role: 'admin',
      phone: '0123456789',
      avatar: '',
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      name: 'Normal User',
      email: 'user@example.com',
      password: hashedUserPassword,
      role: 'user',
      phone: '0987654321',
      avatar: '',
    },
  });

  // Seed property
  const property1 = await prisma.property.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Beautiful Family House',
      description: 'A lovely 4-bedroom family house in the suburbs.',
      price: 350000,
      area: 200,
      location: 'Trục đường Xa Lộ Hà Nội, liền kề khu Thảo Điền, Quận 2, TP.HCM',
      latitude: 40.7128,
      longitude: -74.006,
      type: 'house',
      images: [
        'https://images.adsttc.com/media/images/5258/945f/e8e4/4e67/bf00/0886/slideshow/14.jpg?1381536817',
        'https://images.adsttc.com/media/images/5258/9382/e8e4/4ecb/1700/0879/slideshow/4.jpg?1381536621',
      ],
      bedrooms: 4,
      bathrooms: 2,
    },
  });

  const property2 = await prisma.property.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Modern Apartment Downtown',
      description: 'A stylish 2-bedroom apartment in the city center.',
      price: 500000,
      area: 85,
      location: 'Số 2, đường Tôn Đức Thắng, phường Bến Nghé, Quận 1, TP.HCM',
      latitude: 40.7127,
      longitude: -74.0059,
      type: 'apartment',
      images: [
        'https://amazingarchitecture.com/storage/8307/responsive-images/modern-apartment-moscow-ariana-ahmad-design___media_library_original_1344_756.jpg',
        'https://amazingarchitecture.com/storage/files/4049/architecture-firm/ariana-ahmad-design/modern-apartment/modern-apartment-moscow-ariana-ahmad-design-9.jpg',
      ],
      bedrooms: 2,
      bathrooms: 1,
    },
  });

  // Seed contact (user gửi yêu cầu liên hệ property1)
  await prisma.contact.upsert({
    where: { id: 1 },
    update: {},
    create: {
      userId: user.id,
      propertyId: property1.id,
      message: 'I am interested in this house. Please contact me.',
      status: 'pending',
    },
  });

  // Seed favorite (user thích property2)
  await prisma.favorite.upsert({
    where: { id: 1 },
    update: {},
    create: {
      userId: user.id,
      propertyId: property2.id,
    },
  });

  console.log('Seed data: users, properties, contacts, favorites done.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
