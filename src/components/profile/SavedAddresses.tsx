"use client";

import { useState } from "react";
import { Address } from "@/app/profile/page";
import { Home, Building2, Edit, Trash2, Plus } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddAddressForm } from "@/app/checkout/page";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SavedAddressesProps {
  addresses: Address[];
  onRefresh: () => void;
}

export function SavedAddresses({ addresses, onRefresh }: SavedAddressesProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AddAddressForm>({
    defaultValues: {
      lineOne: "",
      lineTwo: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    },
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/address/${id}`,
        {
          withCredentials: true,
        }
      );
      toast.success("Address deleted successfully");
      onRefresh();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to delete address"
      );
    }
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    form.reset({
      lineOne: address.lineOne,
      lineTwo: address.lineTwo || "",
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      country: address.country,
    });
    setIsDialogOpen(true);
  };

  const onSubmit = async (data: AddAddressForm) => {
    setIsLoading(true);
    try {
      if (editingAddress) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/address/${editingAddress.id}`,
          data,
          { withCredentials: true }
        );
        toast.success("Address updated successfully");
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/address`,
          data,
          { withCredentials: true }
        );
        toast.success("Address added successfully");
      }
      setIsDialogOpen(false);
      setEditingAddress(null);
      form.reset();
      onRefresh();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to save address"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getAddressIcon = (lineOne: string) => {
    const lower = lineOne.toLowerCase();
    if (lower.includes("office") || lower.includes("work")) {
      return Building2;
    }
    return Home;
  };

  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-lg font-bold text-text-main">Saved Addresses</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="text-sm font-medium text-accent hover:text-text-main transition-colors flex items-center gap-1"
              onClick={() => setEditingAddress(null)}
            >
              <Plus className="h-4 w-4" />
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingAddress ? "Edit Address" : "Add New Address"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="lineOne"
                  rules={{ required: "Required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 1</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lineTwo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 2 (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="pincode"
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      editingAddress ? "Update Address" : "Add Address"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false);
                      setEditingAddress(null);
                      form.reset();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {addresses.length > 0 ? (
          addresses.map((address) => {
            const Icon = getAddressIcon(address.lineOne);
            const isDefault = address.id === addresses[0]?.id;

            return (
              <div
                key={address.id}
                className="bg-white rounded-xl shadow-sm border border-[#D6C0B3] p-5 relative group hover:shadow-md transition-shadow"
              >
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(address)}
                    className="p-1 text-text-muted hover:text-accent transition-colors"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="p-1 text-text-muted hover:text-red-600 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded bg-[#E4E0E1] text-text-main">
                    <Icon className="h-5 w-5 block" />
                  </div>
                  <h4 className="text-sm font-bold text-text-main">
                    {address.lineOne}
                    {isDefault && " (Default)"}
                  </h4>
                </div>

                <p className="text-sm text-text-muted leading-relaxed">
                  {address.lineOne}
                  {address.lineTwo && <>, {address.lineTwo}</>}
                  <br />
                  {address.city}, {address.state} {address.pincode}
                  <br />
                  {address.country}
                </p>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-[#D6C0B3] p-8 text-center">
            <p className="text-text-muted">No addresses saved yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}

