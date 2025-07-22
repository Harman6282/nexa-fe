import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const ProductsPage: React.FC = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <Card>
        <CardHeader>
          <CardTitle>Manage Products</CardTitle>
        </CardHeader>
        <CardContent>
          <p>List of all products will appear here.</p>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductsPage;
