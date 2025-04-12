import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind CSS sınıflarını birleştirmek için yardımcı fonksiyon
 * clsx ile sınıfları birleştirir ve tailwind-merge ile çakışan sınıfları düzeltir
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Belirli bir aralıkta sayı oluşturur
 * @param start Başlangıç değeri (dahil)
 * @param end Bitiş değeri (dahil)
 */
export function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

/**
 * Rastgele sayı oluşturur
 * @param min Minimum değer (dahil)
 * @param max Maximum değer (dahil)
 */
export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Bir öğenin yavaşça gözükmesi için delay hesaplar
 * @param index Öğenin dizindeki konumu
 * @param delayTime Gecikme süresi (saniye)
 */
export function staggerDelay(index: number, delayTime: number = 0.1) {
  return index * delayTime;
}

/**
 * Bir metin dizesinin ilk harfini büyütür
 * @param text Düzenlenecek metin
 */
export function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Fare pozisyonuna göre 3D dönüşüm değerlerini hesaplar
 * @param e Fare olayı
 * @param element HTML öğesi
 * @param sensitivity Hassasiyet (varsayılan: 25)
 */
export function calculate3DTransform(
  e: React.MouseEvent, 
  element: HTMLElement,
  sensitivity: number = 25
) {
  const rect = element.getBoundingClientRect();
  const x = (e.clientX - rect.left - rect.width / 2) / sensitivity;
  const y = (e.clientY - rect.top - rect.height / 2) / sensitivity;
  
  return { x, y };
}

/**
 * Bir değeri belirli aralıklarla haritalandırır
 * @param value Haritalanacak değer
 * @param inputMin Giriş aralığının minimum değeri
 * @param inputMax Giriş aralığının maksimum değeri
 * @param outputMin Çıkış aralığının minimum değeri
 * @param outputMax Çıkış aralığının maksimum değeri
 */
export function mapRange(
  value: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number
) {
  return (
    outputMin +
    ((outputMax - outputMin) * (value - inputMin)) / (inputMax - inputMin)
  );
}

/**
 * Belirli bir süre bekleyen Promise döndürür
 * @param ms Milisaniye cinsinden bekleme süresi
 */
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Belirli bir sayıyı piksel değerine dönüştürür
 * @param value Dönüştürülecek değer
 */
export function px(value: number) {
  return `${value}px`;
} 