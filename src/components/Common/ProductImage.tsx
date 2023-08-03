
interface ImageListProps {
    images: string[]; 
  }
  
  function ImageList({ images }: ImageListProps) {
    return (
      <div>
        {images.map((imageUrl, index) => (
          <img key={index} width={100} src={imageUrl} alt={`Image ${index}`} />
        ))}
      </div>
    );
  }
  
  export default ImageList;