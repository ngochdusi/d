"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/navbar";
import { ShoppingCart } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function ProductsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/getProducts");
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      } else {
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: "Không thể lấy danh sách sản phẩm",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Có lỗi xảy ra khi lấy danh sách sản phẩm",
      });
    }
  };

  const handlePurchase = (productId) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Vui lòng đăng nhập để mua hàng",
      });
      router.push("/login");
      return;
    }
    router.push(`/product/${productId}`);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Danh sách sản phẩm</h1>

        <div className="mb-6">
          <Label htmlFor="search">Tìm kiếm sản phẩm</Label>
          <Input
            id="search"
            placeholder="Nhập tên sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Card key={product.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                    <p className="text-lg font-semibold text-gray-800">{product.price.toLocaleString()} đ</p>
                    <p className="text-sm text-gray-500">Còn lại: {product.stock} sản phẩm</p>
                  </div>
                </div>
                <Button onClick={() => handlePurchase(product.id)}>
                  <ShoppingCart className="mr-2 h-5 w-5" /> Mua ngay
                </Button>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500">Không tìm thấy sản phẩm nào.</p>
          )}
        </div>
      </main>
    </div>
  );
}
