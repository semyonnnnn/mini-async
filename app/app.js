import { Renderer } from "./UI/Renderer.js";
import { CMS_BLOCK_ID } from "./utils/key.js";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

async function downloadCalendarPDF() {
  const element = document.querySelector(".grandWrapper");
  element.style.borderRadius = '0';
  element.querySelectorAll('.hiddenYear').forEach(el => el.style.display = 'none');
  const infoBlock = document.querySelector('.info');
  if (infoBlock) infoBlock.style.display = 'none';

  // Render element to canvas
  const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: "#3a98b0" });

  const A4_WIDTH = 595.28;  // pt
  const A4_HEIGHT = 841.89; // pt

  // Calculate scale to fit both width and height
  const scaleX = A4_WIDTH / canvas.width;
  const scaleY = A4_HEIGHT / canvas.height;
  const scale = Math.min(scaleX, scaleY); // scale down proportionally

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const imgWidth = canvas.width * scale;
  const imgHeight = canvas.height * scale;

  const imgData = canvas.toDataURL('image/jpeg', 0.98);

  // Optional: fill background
  pdf.setFillColor(58, 152, 176); // your color
  pdf.rect(0, 0, A4_WIDTH, A4_HEIGHT, 'F');

  // Add scaled image centered
  const marginX = (A4_WIDTH - imgWidth) / 2;
  const marginY = (A4_HEIGHT - imgHeight) / 2;
  pdf.addImage(imgData, 'JPEG', marginX, marginY, imgWidth, imgHeight);

  const date = {
    year: document.querySelector('.displayedYear').textContent,
    month: document.querySelector('.currentMonth').textContent
  };

  pdf.save(`статкалендарь_${date.month}_${date.year}.pdf`);

  if (infoBlock) infoBlock.style.display = 'flex';
  element.style.borderRadius = '2rem';
}






document.addEventListener("DOMContentLoaded", async () => {
  const cms_block = document.getElementById(CMS_BLOCK_ID)?.parentElement;

  const head = document.head;

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.download_button');
    if (!btn) return;
    downloadCalendarPDF();
  });

  // Google Fonts
  ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'].forEach(href => {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = href;
    if (href.includes('gstatic')) link.crossOrigin = "";
    head.appendChild(link);
  });

  const fontStyles = document.createElement("link");
  fontStyles.rel = "stylesheet";
  fontStyles.href = "https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Montserrat+Alternates:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap";
  head.appendChild(fontStyles);

  if (cms_block) {
    Object.assign(cms_block.style, {
      padding: "2rem",
      margin: 0,
      backgroundColor: "#238ca6",
    });
    const renderer = new Renderer(cms_block);
    await renderer.init();

    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault(); // stop browser print
        downloadCalendarPDF();
      }
    });
  }
});

if (import.meta.webpackHot) import.meta.webpackHot.accept();
