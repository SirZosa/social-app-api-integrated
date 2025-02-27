import Lottie from "lottie-web";
import { useEffect, useRef, useState } from "react";
type LottiePlayerProps = {
    isActive?: boolean;
    animationDataSrc: any;
    startFrame?: number;
    endFrame?: number;
    height?: number;
    width?: number;
    loop?: boolean;
    autoplay?: boolean;
    onClick?: () => void;
}
export default function LottiePlayer({isActive=false, animationDataSrc, startFrame = 1, endFrame = -1, height=50, width=50, loop=false, autoplay=false, onClick}: LottiePlayerProps) {
    const animationContainer = useRef<HTMLDivElement>(null);
    const animationInstance = useRef<any>();
    const [isPlayingForward, setIsPlayingForward] = useState(isActive);

    useEffect(() => {
        if (animationContainer.current) {
            animationInstance.current = Lottie.loadAnimation({
                container: animationContainer.current,
                renderer: 'svg',
                loop: loop,
                autoplay: autoplay,
                animationData: animationDataSrc,
                rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice' // or 'none' for stretch
                  }
            });
        }

        const initialFrame = isActive ? animationInstance.current.totalFrames - 1 : 0;
        animationInstance.current.setSegment(startFrame, animationInstance.current.totalFrames - endFrame);
        animationInstance.current.goToAndStop(initialFrame, true);
        if(autoplay){
            animationInstance.current.play();
        }

        return () => {
            if (animationInstance.current) {
                animationInstance.current.destroy();
            }
        };
    }, []);

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
        if (animationInstance.current && !autoplay) {
            const anim = animationInstance.current;
            
            anim.stop();
            const newDirection = !isPlayingForward;
            setIsPlayingForward(newDirection);
            
            anim.setDirection(newDirection ? 1 : -1);
            
            // Set the starting frame before playing
            if (newDirection) {
                anim.goToAndStop(startFrame, true);
            } else {
                anim.goToAndStop(anim.totalFrames - endFrame, true);
            }
            
            anim.play();
        }
    };

    return (
        <div 
            className="lottie"
            role="button"
            aria-pressed={isActive}
            ref={animationContainer} 
            onClick={handleClick}
            style={{ 
                width: `${width}px`, 
                height: `${height}px`,
                cursor: "pointer"
            }}
        ></div>
    );
}