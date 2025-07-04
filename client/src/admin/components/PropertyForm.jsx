import React, { useEffect } from 'react';
import { useCreatePropertyMutation, useUpdatePropertyMutation } from '../../features/properties/propertiesApi';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const propertySchema = Yup.object({
  title: Yup.string().required('Bắt buộc nhập tiêu đề'),
  price: Yup.number().required('Bắt buộc nhập giá').positive(),
  area: Yup.number().required('Bắt buộc nhập diện tích').positive(),
  type: Yup.string().required('Chọn loại bất động sản'),
  province: Yup.string().required('Bắt buộc nhập tỉnh/thành phố'),
  district: Yup.string().required('Bắt buộc nhập quận/huyện'),
  ward: Yup.string().required('Bắt buộc nhập phường/xã'),
  streetAddress: Yup.string().required('Bắt buộc nhập địa chỉ đường'),
  // Thêm các trường khác nếu cần
});

export default function PropertyForm({ property, onClose }) {
  const [createProperty] = useCreatePropertyMutation();
  const [updateProperty] = useUpdatePropertyMutation();

  const formik = useFormik({
    initialValues: {
      title: property?.title || '',
      price: property?.price || '',
      area: property?.area || '',
      type: property?.type || '',
      province: property?.province || '',
      district: property?.district || '',
      ward: property?.ward || '',
      streetAddress: property?.streetAddress || '',
    },
    validationSchema: propertySchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (property) {
          await updateProperty({ id: property.id, ...values }).unwrap();
        } else {
          await createProperty(values).unwrap();
        }
        onClose();
      } catch (err) {
        alert('Lỗi khi lưu dự án');
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="mb-4 p-4 border border-accent rounded shadow bg-accent-light">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Tiêu đề"
          value={formik.values.title}
          onChange={formik.handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {formik.errors.title && formik.touched.title && (
          <p className="text-cta text-sm">{formik.errors.title}</p>
        )}

        <input
          name="price"
          type="number"
          placeholder="Giá (triệu)"
          value={formik.values.price}
          onChange={formik.handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {formik.errors.price && formik.touched.price && (
          <p className="text-cta text-sm">{formik.errors.price}</p>
        )}

        <input
          name="area"
          type="number"
          placeholder="Diện tích (m²)"
          value={formik.values.area}
          onChange={formik.handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {formik.errors.area && formik.touched.area && (
          <p className="text-cta text-sm">{formik.errors.area}</p>
        )}

        <select
          name="type"
          value={formik.values.type}
          onChange={formik.handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Chọn loại bất động sản</option>
          <option value="house">Nhà ở</option>
          <option value="apartment">Căn hộ</option>
          <option value="land">Đất</option>
        </select>
        {formik.errors.type && formik.touched.type && (
          <p className="text-cta text-sm">{formik.errors.type}</p>
        )}

        <input
          name="province"
          placeholder="Tỉnh/Thành phố"
          value={formik.values.province}
          onChange={formik.handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {formik.errors.province && formik.touched.province && (
          <p className="text-cta text-sm">{formik.errors.province}</p>
        )}

        <input
          name="district"
          placeholder="Quận/Huyện"
          value={formik.values.district}
          onChange={formik.handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {formik.errors.district && formik.touched.district && (
          <p className="text-cta text-sm">{formik.errors.district}</p>
        )}

        <input
          name="ward"
          placeholder="Phường/Xã"
          value={formik.values.ward}
          onChange={formik.handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {formik.errors.ward && formik.touched.ward && (
          <p className="text-cta text-sm">{formik.errors.ward}</p>
        )}

        <input
          name="streetAddress"
          placeholder="Số nhà, tên đường"
          value={formik.values.streetAddress}
          onChange={formik.handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {formik.errors.streetAddress && formik.touched.streetAddress && (
          <p className="text-cta text-sm">{formik.errors.streetAddress}</p>
        )}

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-200 transition"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="px-4 py-2 bg-cta text-white rounded hover:bg-cta-hover transition"
          >
            {property ? 'Cập nhật' : 'Thêm mới'}
          </button>
        </div>
      </form>
    </div>
  );
}
