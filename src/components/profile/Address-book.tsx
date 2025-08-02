"use client";

import { AddressBookProps } from "@/app/profile/page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit3, Plus, Trash2 } from "lucide-react";

export function AddressBook({ addresses }: AddressBookProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
        <Button className="bg-gray-900 text-white hover:bg-gray-800">
          <Plus className="w-4 h-4 mr-2" />
          Add Address
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address, index) => (
          <Card key={index} className="border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                {/* <CardTitle className="text-lg text-gray-900">
                  {address.type}
                </CardTitle> */}
                {/* {address.isDefault && (
                  <Badge
                    variant="outline"
                    className="border-gray-300 text-gray-700"
                  >
                    Default
                  </Badge>
                )} */}
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="font-medium text-gray-900">{address.lineOne}</p>
              <p className="text-gray-600">{address.lineTwo}</p>
              <p className="text-gray-600">{address.city}</p>
              <p className="text-gray-600">{address.state}</p>
              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-300 text-gray-700 bg-transparent"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-300 text-gray-700 bg-transparent"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
