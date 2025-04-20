"use client"

import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { Cart } from "@/components/cart"

interface CartButtonProps {
  className?: string
  variant?: "default" | "outline" | "secondary" | "link" | "ghost" | "destructive" | null
}

export default function CartButton({ className, variant = "outline" }: CartButtonProps) {
  const { cart } = useCart()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={variant} size="sm" className={cn("relative rounded-full px-4 py-2", className)}>
          <ShoppingCart className="h-5 w-5 mr-2" />
          <span>Cart</span>
          {isClient && cart.totalItems > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {cart.totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <Cart />
    </Sheet>
  )
}
