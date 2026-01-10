import type {AuthType} from '@/types/AuthType'

export default function AuthLayout({ children }: AuthType) {
    
  return (
    <div className="h-full w-full flex items-center justify-center bg-[#0C1014]">
      {children}
    </div>
  );
}
