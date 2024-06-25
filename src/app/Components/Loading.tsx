import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('react-lottie-player'), {
  ssr: false,
});

import loadingAnimation from '../../../public/loading.json'

function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Lottie
        loop
        animationData={loadingAnimation}
        play
        style={{ width: 150, height: 150 }}
      />
    </div>
  );
}

export default Loading;

