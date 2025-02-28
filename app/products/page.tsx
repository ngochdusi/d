"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectItem } from "@/components/ui/select";
import Navbar from "@/components/navbar";
import { useToast } from "@/components/ui/use-toast";

export default function ProductsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("name");
  const [category, setCategory] = useState("all");

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

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "price") return a.price - b.price;
    if (sortOption === "stock") return b.stock - a.stock;
    return a.name.localeCompare(b.name);
  });

  const filteredProducts = category === "all" ? sortedProducts : sortedProducts.filter(p => p.category === category);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Danh sách sản phẩm</h1>

        <div className="flex justify-between mb-4">
          <Select onValueChange={setCategory} value={category}>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="electronics">Điện tử</SelectItem>
            <SelectItem value="fashion">Thời trang</SelectItem>
            <SelectItem value="home">Gia dụng</SelectItem>
          </Select>

          <Select onValueChange={setSortOption} value={sortOption}>
            <SelectItem value="name">Sắp xếp theo tên</SelectItem>
            <SelectItem value="price">Sắp xếp theo giá</SelectItem>
            <SelectItem value="stock">Sắp xếp theo số lượng</SelectItem>
          </Select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                <p className="text-lg font-semibold mt-2">{product.price.toLocaleString()} đ</p>
                <p className="text-sm text-gray-600">Còn lại: {product.stock}</p>
                <Button className="mt-2 w-full">Mua ngay</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
