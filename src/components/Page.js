import { useEffect, useState, useRef } from "react";

import { useViewport } from "../api/ViewportContext";

function load(src) {
  return new Promise(function(resolve, reject) {
    const image = new Image();
    image.addEventListener('load', resolve);
    image.addEventListener('error', reject);
    image.src = src;
  });
}

export default function Page(props) {
  const {
    imageName,
    text,
    textDisplay
  } = props;
  const containerRef = useRef(null);

  const [image, setImage] = useState('');
  const [imageDim, setImageDim] = useState(null);
  const [computedDim, setComputedDim] = useState({});

  const { viewportDimensions } = useViewport();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await import(`../images/${imageName}`);
        setImage(res);
      } catch (err) {
        console.log(err);
      }
    }
    fetchImage();
  }, [imageName]);

  useEffect(() => {
    if (!image) return;
    load(image.default)
    .then((res) => {
      setImageDim(
        {
          width: res.target.naturalWidth,
          height: res.target.naturalHeight
        }
      )
    });
  }, [image]);

  useEffect(() => {
    if (!containerRef.current || !imageDim) return;
    const containerDim = containerRef.current.getBoundingClientRect();
    const containerAspectRatio = containerDim.width/containerDim.height;
    const imageAspectRatio = imageDim.width/imageDim.height;

    if (imageAspectRatio > containerAspectRatio) {
      setComputedDim({
        width: containerDim.width,
        height: containerAspectRatio / imageAspectRatio * containerDim.height
      });
      return;
    }

    setComputedDim({
      width: imageAspectRatio / containerAspectRatio * containerDim.width,
      height: containerDim.height,
    });

  }, [imageDim, containerRef, viewportDimensions]);

  if (!imageDim) {
    return <></>
  }

  return (
    <div
      className="page-container"
      ref={containerRef}
      style={
        {
          width: '100vw',
          height: 'calc(100vh - 80px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      }
    >
      <div
        className="page-content"
        style={
          {
            position: 'relative',
            height: computedDim.height + 'px',
            width: computedDim.width + 'px',
            backgroundImage: `url(${image.default})`,
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
          }
        }
      >
        {textDisplay && textDisplay.map((disp, i) => (
          <div
            key={i}
            className="page-text"
            style={
              {
                position: 'absolute',
                width: disp.width + '%',
                left: disp.pos[0] - disp.width / 2 + '%',
                top: disp.pos[1] + '%',
                color: disp.colour ?? 'black',
                fontSize: computedDim.height / 1000 * (19 + i) + 'px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center'
              }
            }
          >
            <p className="page-text-first">
              {text[i].first}
            </p>
            <p className="page-text-second">
              {text[i].second}
            </p>
          </div>
        ))}
      </div>
    </div>
  )

}