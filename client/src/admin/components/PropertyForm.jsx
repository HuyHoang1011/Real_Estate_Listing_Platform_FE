import React, { useEffect } from 'react';
import { useCreatePropertyMutation, useUpdatePropertyMutation } from '../../features/properties/propertiesApi';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const propertySchema = Yup.object({
  title: Yup.string().required('Bắt buộc nhập tiêu đề'),
  price: Yup.number().required('Bắt buộc nhập giá').positive(),
  area: Yup.number().required('Bắt buộc nhập diện tích').positive(),
  type: Yup.string().required('Chọn loại bất động sản'),
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
    <div className="mb-4 p-4 border rounded shadow bg-gray-50">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Tiêu đề"
          value={formik.values.title}
          onChange={formik.handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        {formik.errors.title && formik.touched.title && (
          <p className="text-red-600 text-sm">{formik.errors.title}</p>
        )}

        <input
          name="price"
          type="number"
          placeholder="Giá (triệu)"
          value={formik.values.price}
          onChange={formik.handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        {formik.errors.price && formik.touched.price && (
          <p className="text-red-600 text-sm">{formik.errors.price}</p>
        )}

        <input
          name="area"
          type="number"
          placeholder="Diện tích (m²)"
          value={formik.values.area}
          onChange={formik.handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        {formik.errors.area && formik.touched.area && (
          <p className="text-red-600 text-sm">{formik.errors.area}</p>
        )}

        <select
          name="type"
          value={formik.values.type}
          onChange={formik.handleChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Chọn loại bất động sản</option>
          <option value="house">Nhà ở</option>
          <option value="apartment">Căn hộ</option>
          <option value="land">Đất</option>
        </select>
        {formik.errors.type && formik.touched.type && (
          <p className="text-red-600 text-sm">{formik.errors.type}</p>
        )}

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-200"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {property ? 'Cập nhật' : 'Thêm mới'}
          </button>
        </div>
      </form>
    </div>
  );
}
