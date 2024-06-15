import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const loadImageAsBase64 = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/jpeg');
      resolve(dataURL);
    };
    img.onerror = reject;
    img.src = url;
  });
};

export const gerarRelatorioPDF = async (produtosFiltrados) => {
  const doc = new jsPDF();

  // Configurações iniciais
  const marginLeft = 20; // Margem de 20 unidades à esquerda
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const logoWidth = 20; // Tamanho do logo
  const dataAtual = new Date().toLocaleDateString(); // Data atual formatada

  // Função para adicionar cabeçalho em todas as páginas
  const addHeader = async () => {
    // Desenhar linha do cabeçalho
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(45, 15, pageWidth - marginLeft, 15);

    // Carregar logo da empresa
    const logoBase64 = await loadImageAsBase64('/logo.jpg');

    // Adicionar logo da empresa
    doc.addImage(logoBase64, 'JPEG', marginLeft, 5, logoWidth, logoWidth * (15 / 15)); // Ajuste conforme necessário

    // Adicionar texto do cabeçalho
    doc.setFontSize(18);
    doc.text('Relatório de Estoque', pageWidth / 2, 12, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Viviane Mantovani Ribeiro ME', pageWidth / 2, 20, { align: 'center' });
    doc.text(`Data: ${dataAtual}`, pageWidth - marginLeft, 20, { align: 'right' });
  };

  // Função para adicionar rodapé em todas as páginas
  const addFooter = () => {
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      const text = `Página ${i} de ${pageCount}`;
      const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      const centerX = pageWidth / 2 - textWidth / 2;
      doc.setFontSize(10);
      doc.text(text, centerX, pageHeight - 10);
    }
  };

  // Adicionar header na primeira página
  await addHeader();

  // Tabela de produtos
  const tableData = produtosFiltrados.map(produto => [produto.codigo, produto.nome, produto.estoque_atual || 0]);

  // Adicionar Tabela de produtos nas páginas
  doc.autoTable({
    head: [['Código', 'Nome do Produto', 'Quantidade']],
    body: tableData,
    startY: 30,
    margin: { left: marginLeft }, // Espaçamento à esquerda da tabela
      });
    addFooter(); // Adicionar rodapé em todas as páginas

  // Nome do arquivo para download
  const fileName = `relatorio_estoque_${dataAtual.replaceAll('/', '-')}.pdf`;

  // Abrir página e imprimir
  const pdfOutput = doc.output();
  const buffer = new ArrayBuffer(pdfOutput.length);
  const array = new Uint8Array(buffer);
  for (let i = 0; i < pdfOutput.length; i++) {
    array[i] = pdfOutput.charCodeAt(i);
  }
  const blob = new Blob([array], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const printWindow = window.open(url, '_blank');
  printWindow.addEventListener('load', () => {
    printWindow.print();
  });

  // Salvando o arquivo
  // doc.save(fileName);
};
