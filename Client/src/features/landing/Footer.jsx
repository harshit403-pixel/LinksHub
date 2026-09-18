import { useEffect, useRef } from "react";
import * as THREE from "three";

const GRID_SIZE = 25;
const MOUSE_RADIUS = 0.25;
const STRENGTH = 0.1;
const RELAXATION = 0.925;
const DISPLACEMENT = 0.015;
const ABERRATION = 0.15;

const FOOTER_LINKS = {
  Product: [
    { label: "How it works", href: "#how-it-works" },
    { label: "Solution", href: "#solution" },
    { label: "FAQ", href: "#faq" },
  ],

  Resources: [
    { label: "Trust", href: "#trust" },
    { label: "Privacy", href: "#privacy" },
    { label: "Support", href: "#support" },
  ],

  Connect: [
    { label: "X (Twitter)", href: "https://x.com/" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/harshit-raghuwanshi-278243281/",
    },
    {
      label: "Portfolio",
      href: "https://harshits-portfolio.vercel.app/",
    },
  ],
};
const Footer = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.offsetWidth;
    let height = container.offsetHeight;

    let gridX;
    let gridY;
    let animationId;

    const mouse = {
      x: 0.5,
      y: 0.5,
      prevX: 0.5,
      prevY: 0.5,
      vX: 0,
      vY: 0,
    };

    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(
      -1,
      1,
      1,
      -1,
      0.1,
      10
    );

    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.domElement.className =
      "absolute inset-0 h-full w-full";

    container.appendChild(renderer.domElement);

    const texture = new THREE.TextureLoader().load(
      "/images/landing/footer.png"
    );

    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;

    const createDataTexture = () => {
      const aspect = width / height;

      gridX =
        aspect >= 1
          ? Math.round(GRID_SIZE * aspect)
          : GRID_SIZE;

      gridY =
        aspect >= 1
          ? GRID_SIZE
          : Math.round(GRID_SIZE / aspect);

      const data = new Float32Array(gridX * gridY * 4);

      const dataTexture = new THREE.DataTexture(
        data,
        gridX,
        gridY,
        THREE.RGBAFormat,
        THREE.FloatType
      );

      dataTexture.magFilter = THREE.NearestFilter;
      dataTexture.minFilter = THREE.NearestFilter;
      dataTexture.needsUpdate = true;

      return dataTexture;
    };

    let dataTexture = createDataTexture();

    const getCoverScale = () => {
      const imageAspect =
        (texture.image?.width || 16) /
        (texture.image?.height || 9);

      const containerAspect = width / height;

      const scaleX =
        containerAspect < imageAspect
          ? imageAspect / containerAspect
          : 1;

      const scaleY =
        containerAspect > imageAspect
          ? containerAspect / imageAspect
          : 1;

      return [2 * scaleX, 2 * scaleY];
    };

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: {
          value: texture,
        },
        uDataTexture: {
          value: dataTexture,
        },
      },

      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;

          gl_Position =
            projectionMatrix *
            modelViewMatrix *
            vec4(position, 1.0);
        }
      `,

      fragmentShader: `
        uniform sampler2D uTexture;
        uniform sampler2D uDataTexture;

        varying vec2 vUv;

        void main() {
          vec4 offset = texture2D(
            uDataTexture,
            vUv
          );

          vec2 shift =
            ${DISPLACEMENT.toFixed(3)} * offset.rg;

          vec2 split =
            shift * ${ABERRATION.toFixed(3)};

          float r = texture2D(
            uTexture,
            vUv - shift + split
          ).r;

          float g = texture2D(
            uTexture,
            vUv - shift
          ).g;

          float b = texture2D(
            uTexture,
            vUv - shift - split
          ).b;

          gl_FragColor = vec4(r, g, b, 1.0);
        }
      `,
    });

    let mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(...getCoverScale()),
      material
    );

    scene.add(mesh);

    const updateGeometry = () => {
      mesh.geometry.dispose();

      mesh.geometry = new THREE.PlaneGeometry(
        ...getCoverScale()
      );
    };

    const updateDataTexture = () => {
      const data = dataTexture.image.data;

      for (let i = 0; i < data.length; i += 4) {
        data[i] *= RELAXATION;
        data[i + 1] *= RELAXATION;
      }

      const gridMouseX = gridX * mouse.x;
      const gridMouseY = gridY * (1 - mouse.y);

      const maxDist = GRID_SIZE * MOUSE_RADIUS;

      for (let i = 0; i < gridX; i++) {
        for (let j = 0; j < gridY; j++) {
          const distanceSq =
            (gridMouseX - i) ** 2 +
            (gridMouseY - j) ** 2;

          if (distanceSq >= maxDist * maxDist) {
            continue;
          }

          const index = 4 * (i + gridX * j);

          const power = Math.min(
            10,
            maxDist / Math.sqrt(distanceSq || 0.0001)
          );

          data[index] +=
            STRENGTH * 100 * mouse.vX * power;

          data[index + 1] -=
            STRENGTH * 100 * mouse.vY * power;
        }
      }

      mouse.vX *= 0.9;
      mouse.vY *= 0.9;

      dataTexture.needsUpdate = true;
    };

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) / rect.width;

      const y =
        (event.clientY - rect.top) / rect.height;

      mouse.vX = x - mouse.prevX;
      mouse.vY = y - mouse.prevY;

      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;

      mouse.x = x;
      mouse.y = y;
    };

    const handleResize = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;

      updateGeometry();

      dataTexture.dispose();
      dataTexture = createDataTexture();

      material.uniforms.uDataTexture.value =
        dataTexture;

      renderer.setSize(width, height);
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
      );
    };

    const animate = () => {
      updateDataTexture();
      renderer.render(scene, camera);

      animationId = requestAnimationFrame(animate);
    };

    container.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener("resize", handleResize);

  texture.onUpdate = () => {
  if (mesh) {
    updateGeometry();
  }
};

    animate();

    return () => {
      cancelAnimationFrame(animationId);

      container.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener("resize", handleResize);

      mesh.geometry.dispose();
      material.dispose();
      texture.dispose();
      dataTexture.dispose();
      renderer.dispose();

      renderer.domElement.remove();
    };
  }, []);

  return (
    <footer
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#f5f5f5] font-mono"
    >
         <div className="pointer-events-none absolute z-20 -top-10 inset-0">

        <div className="absolute left-0 right-0 top-[120px] landing-grid-horizontal landing-grid-delay-1" />
      </div>

      <div className="absolute top-40 left-6 right-6 z-10 grid grid-cols-2  font-mono font-bold sm:left-12 sm:right-12 sm:grid-cols-4 lg:left-20 lg:right-20">
  {Object.entries(FOOTER_LINKS).map(([category, links]) => (
    <div key={category}>
      <h3 className="mb-6 text-sm  tracking-wide text-[#1c1c1c]">
        {category}
      </h3>

      <div className="flex flex-col items-start gap-2">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={
              link.href.startsWith("http") ? "_blank" : undefined
            }
            rel={
              link.href.startsWith("http")
                ? "noopener noreferrer"
                : undefined
            }
            className="text-sm tracking-wide text-[#555555] transition-colors duration-300 hover:text-[#1c1c1c]"
          >
            {link.label.toLowerCase()}
          </a>
        ))}
      </div>
    </div>
  ))}

  {/* Disclaimer */}
  <div>
    <h3 className="mb-6 text-sm tracking-wide text-[#1c1c1c]">
      Disclaimer
    </h3>

    <p className="max-w-[250px] font-mono text-sm leading-6 text-[#555555]">
      LinksHub helps you present your work.
      <br />
      Your projects and information remain your responsibility.
    </p>
  </div>
</div>


    </footer>
  );
};

export default Footer;