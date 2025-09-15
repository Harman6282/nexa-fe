"use client";

import { AddAddressForm, Address } from "@/app/checkout/page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { Edit3, Loader2, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { userStore } from "@/lib/store";
import AddressShimmer from "../shimmer/Address_shimmer";

export interface NewAddressSchema {
  lineOne: string;
  lineTwo?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export function AddressBook() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const addAddressForm = useForm<AddAddressForm>({
    defaultValues: {
      lineOne: "",
      lineTwo: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    },
  });

  const editAddressForm = useForm<AddAddressForm>({
    defaultValues: {
      lineOne: "",
      lineTwo: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    },
  });

  const getAddresses = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/address`,
        {
          withCredentials: true,
        }
      );
      setAddresses(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddresses();
  }, []);

  const onSubmitNewAddress = async (data: AddAddressForm) => {
    const newAddr: NewAddressSchema = {
      lineOne: data.lineOne.trim(),
      lineTwo: data.lineTwo?.trim(),
      city: data.city.trim(),
      state: data.state.trim(),
      pincode: data.pincode.trim(),
      country: data.country.trim(),
    };
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/address`,
        newAddr,
        { withCredentials: true }
      );
      setAddresses((prev) => [...prev, res?.data?.address]);
      toast.success(res?.data?.message || "Address added successfully");
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to add address");
      setIsLoading(false);
    }
    addAddressForm.reset();
    setIsDialogOpen(false);
  };

  const onSubmitEditAddress = async (data: AddAddressForm) => {
    if (!editingAddress?.id) return;

    const updatedAddr: NewAddressSchema = {
      lineOne: data.lineOne.trim(),
      lineTwo: data.lineTwo?.trim(),
      city: data.city.trim(),
      state: data.state.trim(),
      pincode: data.pincode.trim(),
      country: data.country.trim(),
    };

    try {
      setIsEditLoading(true);
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/address/update/${editingAddress.id}`,
        updatedAddr,
        {
          withCredentials: true,
        }
      );
      toast.success(res?.data?.message || "Address updated successfully");

      // Update the address in the local state
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingAddress.id ? { ...addr, ...updatedAddr } : addr
        )
      );

      setIsEditLoading(false);
      setIsEditDialogOpen(false);
      setEditingAddress(null);
      editAddressForm.reset();
    } catch (error: any) {
      console.log("error while updating address");
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message || "Failed to update address");
      setIsEditLoading(false);
    }
  };

  const deleteAddress = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/address/delete/${id}`,
        {
          withCredentials: true,
        }
      );

      toast.success(res?.data?.message);
      setAddresses(addresses.filter((address) => address?.id != id));
      setIsLoading(false);
    } catch (error: any) {
      console.log(
        error?.response?.data?.message || "error while deleting address"
      );
      toast.error(error?.response?.data?.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleEditClick = (address: Address) => {
    setEditingAddress(address);
    editAddressForm.reset({
      lineOne: address.lineOne || "",
      lineTwo: address.lineTwo || "",
      city: address.city || "",
      state: address.state || "",
      pincode: address.pincode || "",
      country: address.country || "",
    });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant={"default"} className=" mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-white">
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
            </DialogHeader>
            <Form {...addAddressForm}>
              <form
                onSubmit={addAddressForm.handleSubmit(onSubmitNewAddress)}
                className="space-y-4 bg-white text-black p-5"
              >
                <FormField
                  control={addAddressForm.control}
                  name="lineOne"
                  rules={{ required: "Required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Line one</FormLabel>
                      <FormControl>
                        <Input placeholder="Home / Office" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addAddressForm.control}
                  name="lineTwo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Line two <span>(optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main Street" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={addAddressForm.control}
                    name="city"
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="City" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addAddressForm.control}
                    name="state"
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="State" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={addAddressForm.control}
                    name="pincode"
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl>
                          <Input placeholder="10001" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addAddressForm.control}
                    name="country"
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="country" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-2 pt-4 items-center mt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-black text-white "
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Add Address"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="default"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Address Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Edit Address</DialogTitle>
          </DialogHeader>
          <Form {...editAddressForm}>
            <form
              onSubmit={editAddressForm.handleSubmit(onSubmitEditAddress)}
              className="space-y-4 bg-white text-black p-5"
            >
              <FormField
                control={editAddressForm.control}
                name="lineOne"
                rules={{ required: "Required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Line one</FormLabel>
                    <FormControl>
                      <Input placeholder="Home / Office" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={editAddressForm.control}
                name="lineTwo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Line two <span>(optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main Street" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editAddressForm.control}
                  name="city"
                  rules={{ required: "Required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editAddressForm.control}
                  name="state"
                  rules={{ required: "Required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="State" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editAddressForm.control}
                  name="pincode"
                  rules={{ required: "Required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code</FormLabel>
                      <FormControl>
                        <Input placeholder="10001" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editAddressForm.control}
                  name="country"
                  rules={{ required: "Required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="country" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-2 pt-4 items-center mt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-black text-white "
                  disabled={isEditLoading}
                >
                  {isEditLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Update Address"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="default"
                  onClick={() => {
                    setIsEditDialogOpen(false);
                    setEditingAddress(null);
                    editAddressForm.reset();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {addresses ? (
          addresses.map((address, index) => (
            <Card key={index} className="border-gray-200">
              <CardContent className="">
                <p className="font-medium text-gray-900">{address?.lineOne}</p>
                <p className="text-gray-600">{address?.lineTwo}</p>
                <p className="text-gray-600">{address?.city}</p>
                <p className="text-gray-600">{address?.state}</p>
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="default"
                    size="sm"
                    className="border-gray-300 text-gray-700 bg-transparent cursor-pointer hover:bg-gray-200"
                    onClick={() => handleEditClick(address)}
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="border-gray-300 text-gray-700 bg-transparent cursor-pointer hover:bg-gray-200"
                    onClick={() => deleteAddress(address?.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {deletingId === address?.id ? (
                      <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                      "Delete"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <AddressShimmer />
        )}
      </div>
    </div>
  );
}
