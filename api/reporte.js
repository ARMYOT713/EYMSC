import PDFDocument from 'pdfkit';

export default function handler(req, res) {
  try {
    console.log('Generando PDF...');

    const doc = new PDFDocument();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=reporte.pdf');

    doc.pipe(res);

    // Contenido
    doc.fontSize(20).text('REPORTE STOCK CLOUD EYMS', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).text('Fecha: ' + new Date().toLocaleString());
    doc.moveDown();

    doc.text('Resumen:');
    doc.text('- Comercios activos: 6');
    doc.text('- Usuarios registrados: 6');
    doc.text('- Productos: 11');
    doc.text('- Ingresos estimados: $5,495');

    doc.moveDown();
    doc.text('Generado automáticamente por el sistema.');

    doc.end();

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al generar PDF' });
  }
}