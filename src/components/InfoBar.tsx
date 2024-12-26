"use client";
interface InfoBarProps {
  year?: string;
  ageRating?: string;
  type?: string;
  genre?: string;
}

const InfoBar = ({ year, ageRating, type, genre }: InfoBarProps) => {
  const infoItems = [year, ageRating, type, genre].filter(Boolean);

  return (
    <div className="flex space-x-2 text-white text-sm">
      {infoItems.map((item, index) => (
        <span key={index}>
          {item}
          {index < infoItems.length - 1 && <span className="mx-1">•</span>}
        </span>
      ))}
    </div>
  );
};

export default InfoBar;
