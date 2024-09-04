'use client'
import Loader from "@/components/Loader"
import { useLoadUserQuery } from "@/redux/features/api/apiSlice"

import { ThemeProvider as NextThemeProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"
import { FC, ReactNode } from "react"

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => (
  <NextThemeProvider  {...props}>
    <Custom>
      {children}
    </Custom>
  </NextThemeProvider>
)


const Custom: FC<{ children: ReactNode }> = ({ children }) => {
  const {isLoading} = useLoadUserQuery({})
  return (
    isLoading ? (
      <div className="h-screen w-full">
        <Loader />
      </div>
    ) : (<>{children}</>)
  );
}
