// Bu dosya statik site oluşturma için server component olarak çalışır
import React from 'react';
import ApplicationFormClient from './ApplicationFormClient';
import { positionParams } from '../../../lib/staticParams';

// Statik parametre yapılandırması - bu kısım sadece build için kullanılır
export function generateStaticParams() {
  return positionParams;
}

// Pozisyon verilerini tanımlayalım
export type Position = {
  title: string;
  department: string;
  location: string;
};

export type PositionData = {
  [key: string]: Position;
};

// Pozisyon verileri
export const positionData: PositionData = {
  'backend-developer': {
    title: 'Backend Developer',
    department: 'Yazılım Geliştirme',
    location: 'İstanbul (Hibrit)'
  },
  'content-marketing': {
    title: 'İçerik Pazarlama Uzmanı',
    department: 'Pazarlama',
    location: 'İstanbul (Hibrit)'
  }
};

// Ana sayfa component'i (Server Component)
const ApplicationPage = ({ params }: { params: { pozisyon: string } }) => {
  const positionId = params.pozisyon;
  
  // İstemci taraflı bileşene pozisyon verilerini aktarıyoruz
  return (
    <ApplicationFormClient positionId={positionId} positionData={positionData} />
  );
};

export default ApplicationPage; 