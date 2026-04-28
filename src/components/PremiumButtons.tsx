import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { motion, HTMLMotionProps } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  to?: string;
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
}

export function BackButton({ to = "/products", children = "Back", className, onClick }: BackButtonProps) {
  const navigate = useNavigate();

  const handleNavigate = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    } else if (to === "-1") {
      navigate(-1);
    } else {
      navigate(to);
    }
  };

  const content = (
    <motion.div
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={{
        tap: { opacity: 0.7, scale: 0.98, x: -1 }
      }}
      className={cn(
        "group relative inline-flex items-center gap-2 text-[#9CA3AF] font-medium tracking-wide transition-colors cursor-pointer outline-none select-none",
        className
      )}
      onClick={handleNavigate}
    >
      <motion.span
        variants={{
          initial: { x: 0 },
          hover: { x: -4 }
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="flex items-center justify-center text-current"
      >
        <ArrowLeft className="h-4 w-4 transition-colors duration-200 group-hover:text-white" />
      </motion.span>
      
      <span className="relative text-sm">
        <span className="transition-colors duration-200 group-hover:text-white">{children}</span>
        {/* Subtle underline animation */}
        <motion.span 
          className="absolute -bottom-1 left-0 h-[1.5px] bg-[#10B981] rounded-full"
          variants={{
            initial: { width: "0%", opacity: 0 },
            hover: { width: "100%", opacity: 1 }
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </span>
      
      {/* Background glow area - larger hit box */}
      <div className="absolute inset-[-12px] rounded-lg -z-10 group-hover:bg-white/5 transition-colors duration-200" />
    </motion.div>
  );

  return content;
}

export function PrimaryButton({ children, className, ...props }: HTMLMotionProps<"button">) {
  return (
    <motion.button
      whileHover="hover"
      whileTap="tap"
      initial="initial"
      variants={{
        initial: { scale: 1 },
        hover: { scale: 1.04 },
        tap: { scale: 0.97 }
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "relative overflow-hidden rounded-full font-semibold text-white outline-none group",
        "bg-gradient-to-r from-[#10B981] to-[#059669] px-8 py-3.5 shadow-lg",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 drop-shadow-sm">
        {children as ReactNode}
      </span>
      
      {/* Gradient shift layer */}
      <motion.div 
        className="absolute inset-0 z-0 bg-gradient-to-r from-[#34D399] to-[#10B981] opacity-0 transition-opacity duration-300 pointer-events-none"
        variants={{
          hover: { opacity: 1 }
        }}
      />
      
      {/* Glow effect box-shadow emulation */}
      <motion.div 
        className="absolute inset-0 -z-10 blur-xl bg-[#10B981]/60 opacity-0 pointer-events-none"
        variants={{
          hover: { opacity: 1 }
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Ripple/shine overlay (optional micro-interaction) */}
      <motion.div 
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent z-0 pointer-events-none"
        variants={{
          hover: { translateX: "100%" }
        }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      />
    </motion.button>
  );
}

export function SecondaryButton({ children, className, ...props }: HTMLMotionProps<"button">) {
  return (
    <motion.button
      whileHover="hover"
      whileTap="tap"
      initial="initial"
      variants={{
        initial: { scale: 1 },
        hover: { scale: 1.02 },
        tap: { scale: 0.98 }
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "relative overflow-hidden rounded-full font-semibold outline-none group backdrop-blur-md",
        "bg-[#1F2937]/40 border border-[#374151] px-8 py-3.5 text-gray-200 shadow-sm",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children as ReactNode}
      </span>
      
      {/* Brighter background on hover */}
      <motion.div 
        className="absolute inset-0 z-0 bg-[#374151]/40 opacity-0 transition-opacity duration-300 pointer-events-none backdrop-blur-sm"
        variants={{ hover: { opacity: 1 } }}
      />
      
      {/* Border glow via overlay */}
      <motion.div 
        className="absolute inset-0 z-0 border border-[#10B981]/50 rounded-full opacity-0 pointer-events-none"
        variants={{ hover: { opacity: 1 } }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      
      {/* Subtle background glow */}
      <motion.div 
        className="absolute inset-0 -z-10 blur-lg bg-[#10B981]/10 opacity-0 pointer-events-none"
        variants={{ hover: { opacity: 1 } }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}
