import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'proyecto',
  title: 'Proyecto',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL del proyecto',
      type: 'slug',
      description: 'Se genera desde el título. Ej: branding-cafe-luna',
      options: { source: 'titulo', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'categoria',
      title: 'Categoría',
      type: 'string',
      options: {
        list: ['Branding', 'Dirección de arte', 'Editorial', 'Ilustración', 'Otro'],
      },
    }),
    defineField({
      name: 'cliente',
      title: 'Cliente',
      type: 'string',
    }),
    defineField({
      name: 'fecha',
      title: 'Fecha',
      type: 'date',
    }),
    defineField({
      name: 'portada',
      title: 'Imagen de portada',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          description: 'Describe la imagen en pocas palabras (accesibilidad y SEO)',
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'galeria',
      title: 'Galería',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Texto alternativo', type: 'string' }],
        },
      ],
      options: { layout: 'grid' },
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'destacado',
      title: '¿Mostrar en el inicio?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'orden',
      title: 'Orden',
      type: 'number',
      description: 'Número menor = aparece primero',
    }),
  ],
  preview: {
    select: { title: 'titulo', subtitle: 'categoria', media: 'portada' },
  },
  orderings: [
    { title: 'Orden manual', name: 'ordenAsc', by: [{ field: 'orden', direction: 'asc' }] },
    { title: 'Más recientes', name: 'fechaDesc', by: [{ field: 'fecha', direction: 'desc' }] },
  ],
})