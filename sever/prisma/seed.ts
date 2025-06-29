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

  // Seed 20 properties
  const properties = [
    {
      title: 'Căn hộ cao cấp Vinhomes Central Park',
      description: 'Căn hộ 2 phòng ngủ tại tòa nhà cao cấp, view hồ bơi và công viên. Nội thất cao cấp, tiện ích đầy đủ.',
      price: 850000,
      area: 75,
      province: 'TP.HCM',
      district: 'Quận Bình Thạnh',
      ward: 'Phường 22',
      streetAddress: '208 Nguyễn Hữu Cảnh, Phường 22',
      latitude: 10.8006,
      longitude: 106.7219,
      type: 'apartment',
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
      ],
      bedrooms: 2,
      bathrooms: 2,
    },
    {
      title: 'Nhà phố thương mại Quận 1',
      description: 'Nhà phố 4 tầng mặt tiền đường lớn, vị trí đắc địa trung tâm. Phù hợp kinh doanh hoặc ở.',
      price: 2500000,
      area: 120,
      province: 'TP.HCM',
      district: 'Quận 1',
      ward: 'Bến Nghé',
      streetAddress: '45 Nguyễn Huệ, Phường Bến Nghé',
      latitude: 10.7769,
      longitude: 106.7009,
      type: 'house',
      images: [
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'
      ],
      bedrooms: 4,
      bathrooms: 3,
    },
    {
      title: 'Biệt thự Vinhomes Golden River',
      description: 'Biệt thự 5 phòng ngủ với view sông Sài Gòn, thiết kế hiện đại, tiện ích 5 sao.',
      price: 8500000,
      area: 350,
      province: 'TP.HCM',
      district: 'Quận 1',
      ward: 'Bến Nghé',
      streetAddress: '2 Tôn Đức Thắng, Phường Bến Nghé',
      latitude: 10.7769,
      longitude: 106.7009,
      type: 'villa',
      images: [
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
      ],
      bedrooms: 5,
      bathrooms: 4,
    },
    {
      title: 'Căn hộ Masteri Thảo Điền',
      description: 'Căn hộ 1 phòng ngủ tại khu vực Thảo Điền sầm uất, gần trường quốc tế.',
      price: 650000,
      area: 55,
      province: 'TP.HCM',
      district: 'Quận 2',
      ward: 'Thảo Điền',
      streetAddress: '159 Xa Lộ Hà Nội, Phường Thảo Điền',
      latitude: 10.8006,
      longitude: 106.7219,
      type: 'apartment',
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
      ],
      bedrooms: 1,
      bathrooms: 1,
    },
    {
      title: 'Nhà riêng Phú Nhuận',
      description: 'Nhà riêng 3 tầng với sân vườn rộng, thiết kế phong cách Đông Dương.',
      price: 1800000,
      area: 200,
      province: 'TP.HCM',
      district: 'Quận Phú Nhuận',
      ward: 'Phường 7',
      streetAddress: '123 Phan Xích Long, Phường 7',
      latitude: 10.8006,
      longitude: 106.7219,
      type: 'house',
      images: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800'
      ],
      bedrooms: 3,
      bathrooms: 2,
    },
    {
      title: 'Căn hộ Landmark 81',
      description: 'Căn hộ 3 phòng ngủ tại tòa nhà cao nhất Việt Nam, view toàn cảnh thành phố.',
      price: 1200000,
      area: 95,
      province: 'TP.HCM',
      district: 'Quận Bình Thạnh',
      ward: 'Phường 22',
      streetAddress: 'Vinhomes Central Park, Phường 22',
      latitude: 10.8006,
      longitude: 106.7219,
      type: 'apartment',
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
      ],
      bedrooms: 3,
      bathrooms: 2,
    },
    {
      title: 'Biệt thự Phú Mỹ Hưng',
      description: 'Biệt thự 4 phòng ngủ tại khu đô thị Phú Mỹ Hưng, thiết kế hiện đại.',
      price: 4500000,
      area: 280,
      province: 'TP.HCM',
      district: 'Quận 7',
      ward: 'Tân Phú',
      streetAddress: '456 Nguyễn Thị Thập, Phường Tân Phú',
      latitude: 10.8006,
      longitude: 106.7219,
      type: 'villa',
      images: [
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
      ],
      bedrooms: 4,
      bathrooms: 3,
    },
    {
      title: 'Căn hộ The Manor Mỹ Đình',
      description: 'Căn hộ 2 phòng ngủ tại khu đô thị Mỹ Đình, gần sân bay và trung tâm thương mại.',
      price: 750000,
      area: 70,
      province: 'Hà Nội',
      district: 'Nam Từ Liêm',
      ward: 'Mỹ Đình 1',
      streetAddress: '91 Nguyễn Hữu Thọ, Phường Mỹ Đình 1',
      latitude: 21.0285,
      longitude: 105.8542,
      type: 'apartment',
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
      ],
      bedrooms: 2,
      bathrooms: 2,
    },
    {
      title: 'Nhà phố Tân Bình',
      description: 'Nhà phố 3 tầng mặt tiền 6m, vị trí thuận tiện giao thông.',
      price: 1200000,
      area: 90,
      province: 'TP.HCM',
      district: 'Quận Tân Bình',
      ward: 'Phường 4',
      streetAddress: '78 Trường Chinh, Phường 4',
      latitude: 10.8006,
      longitude: 106.7219,
      type: 'house',
      images: [
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'
      ],
      bedrooms: 3,
      bathrooms: 2,
    },
    {
      title: 'Căn hộ Sunshine City',
      description: 'Căn hộ 1 phòng ngủ tại khu đô thị mới, giá tốt cho người trẻ.',
      price: 450000,
      area: 45,
      province: 'TP.HCM',
      district: 'Quận 8',
      ward: 'Phường 4',
      streetAddress: '234 Võ Văn Kiệt, Phường 4',
      latitude: 10.8006,
      longitude: 106.7219,
      type: 'apartment',
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
      ],
      bedrooms: 1,
      bathrooms: 1,
    },
    {
      title: 'Biệt thự Vinhomes Riverside',
      description: 'Biệt thự 6 phòng ngủ với view sông Đồng Nai, thiết kế sang trọng.',
      price: 6500000,
      area: 400,
      province: 'TP.HCM',
      district: 'Quận 9',
      ward: 'Long Thạnh Mỹ',
      streetAddress: '789 Mai Chí Thọ, Phường Long Thạnh Mỹ',
      latitude: 10.8006,
      longitude: 106.7219,
      type: 'villa',
      images: [
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
      ],
      bedrooms: 6,
      bathrooms: 5,
    },
    {
      title: 'Căn hộ Saigon Pearl',
      description: 'Căn hộ 2 phòng ngủ tại khu đô thị cao cấp, gần sông Sài Gòn.',
      price: 950000,
      area: 80,
      province: 'TP.HCM',
      district: 'Quận Bình Thạnh',
      ward: 'Phường 22',
      streetAddress: '92 Nguyễn Hữu Cảnh, Phường 22',
      latitude: 10.8006,
      longitude: 106.7219,
      type: 'apartment',
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
      ],
      bedrooms: 2,
      bathrooms: 2,
    },
    {
      title: 'Nhà riêng Gò Vấp',
      description: 'Nhà riêng 2 tầng với sân vườn, thiết kế truyền thống Việt Nam.',
      price: 850000,
      area: 150,
      province: 'TP.HCM',
      district: 'Quận Gò Vấp',
      ward: 'Phường 5',
      streetAddress: '567 Quang Trung, Phường 5',
      latitude: 10.8006,
      longitude: 106.7219,
      type: 'house',
      images: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800'
      ],
      bedrooms: 3,
      bathrooms: 2,
    },
    {
      title: 'Căn hộ The Vista',
      description: 'Căn hộ 3 phòng ngủ tại khu đô thị An Phú, gần trường quốc tế.',
      price: 1100000,
      area: 100,
      province: 'TP.HCM',
      district: 'Quận 2',
      ward: 'An Phú',
      streetAddress: '628C Xa Lộ Hà Nội, Phường An Phú',
      latitude: 10.8006,
      longitude: 106.7219,
      type: 'apartment',
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
      ],
      bedrooms: 3,
      bathrooms: 2,
    },
    {
      title: 'Biệt thự Vinhomes Grand Park',
      description: 'Biệt thự 5 phòng ngủ tại khu đô thị mới, thiết kế hiện đại.',
      price: 3500000,
      area: 320,
      province: 'TP.HCM',
      district: 'Quận 9',
      ward: 'Long Thạnh Mỹ',
      streetAddress: '200 Nguyễn Xiển, Phường Long Thạnh Mỹ',
      latitude: 10.8006,
      longitude: 106.7219,
      type: 'villa',
      images: [
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
      ],
      bedrooms: 5,
      bathrooms: 4,
    },
    {
      title: 'Căn hộ Diamond Plaza',
      description: 'Căn hộ 1 phòng ngủ tại trung tâm Quận 1, gần Diamond Plaza.',
      price: 700000,
      area: 50,
      province: 'TP.HCM',
      district: 'Quận 1',
      ward: 'Bến Nghé',
      streetAddress: '34 Lê Duẩn, Phường Bến Nghé',
      latitude: 10.7769,
      longitude: 106.7009,
      type: 'apartment',
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
      ],
      bedrooms: 1,
      bathrooms: 1,
    },
    {
      title: 'Nhà phố Bình Thạnh',
      description: 'Nhà phố 4 tầng mặt tiền 8m, vị trí đắc địa gần chợ.',
      price: 1800000,
      area: 120,
      province: 'TP.HCM',
      district: 'Quận Bình Thạnh',
      ward: 'Phường 14',
      streetAddress: '123 Điện Biên Phủ, Phường 14',
      latitude: 10.8006,
      longitude: 106.7219,
      type: 'house',
      images: [
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'
      ],
      bedrooms: 4,
      bathrooms: 3,
    },
    {
      title: 'Căn hộ Estella Place',
      description: 'Căn hộ 2 phòng ngủ tại khu đô thị mới, tiện ích hiện đại.',
      price: 600000,
      area: 65,
      province: 'TP.HCM',
      district: 'Quận 2',
      ward: 'An Lạc A',
      streetAddress: '88 Song Hành, Phường An Lạc A',
      latitude: 10.8006,
      longitude: 106.7219,
      type: 'apartment',
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
      ],
      bedrooms: 2,
      bathrooms: 2,
    },
    {
      title: 'Biệt thự Vinhomes Skylake',
      description: 'Biệt thự 4 phòng ngủ với view hồ, thiết kế phong cách châu Âu.',
      price: 2800000,
      area: 250,
      province: 'TP.HCM',
      district: 'Quận 2',
      ward: 'An Lạc A',
      streetAddress: '456 Phạm Văn Đồng, Phường An Lạc A',
      latitude: 10.8006,
      longitude: 106.7219,
      type: 'villa',
      images: [
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
      ],
      bedrooms: 4,
      bathrooms: 3,
    },
    {
      title: 'Căn hộ The Manor',
      description: 'Căn hộ 3 phòng ngủ tại khu đô thị Mỹ Đình, gần sân vận động.',
      price: 900000,
      area: 85,
      province: 'Hà Nội',
      district: 'Nam Từ Liêm',
      ward: 'Mỹ Đình 2',
      streetAddress: '91 Nguyễn Hữu Thọ, Phường Mỹ Đình 2',
      latitude: 21.0285,
      longitude: 105.8542,
      type: 'apartment',
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
      ],
      bedrooms: 3,
      bathrooms: 2,
    }
  ];

  // Create all properties
  for (let i = 0; i < properties.length; i++) {
    await prisma.property.upsert({
      where: { id: i + 1 },
      update: {},
      create: properties[i],
    });
  }

  // Seed contact (user gửi yêu cầu liên hệ property1)
  await prisma.contact.upsert({
    where: { id: 1 },
    update: {},
    create: {
      userId: user.id,
      propertyId: 1,
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
      propertyId: 2,
    },
  });

  console.log('Seed data: users, 20 properties, contacts, favorites done.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
