import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const OrdersPage: React.FC = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      <Card>
        <CardHeader>
          <CardTitle>Manage Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <p>List of all orders will appear here.</p>
        </CardContent>
      </Card>
    </>
  );
};

export default OrdersPage;
