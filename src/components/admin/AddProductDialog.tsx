"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  X,
  Upload,
  Image as ImageIcon,
  Package,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import axios from "axios";

// Form validation schema
const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(0, "Price must be positive"),
  discount: z.number().min(0).max(100, "Discount must be between 0-100"),
  brand: z.string().min(1, "Brand is required"),
  categoryName: z.string().min(1, "Category is required"),
  images: z
    .array(z.string())
    .min(1, "At least one image is required")
    .max(5, "Maximum 5 images allowed"),
  variants: z
    .array(
      z.object({
        size: z.string().min(1, "Size is required"),
        stock: z.number().min(0, "Stock must be non-negative"),
      })
    )
    .min(1, "At least one variant is required"),
});

type ProductFormData = z.infer<typeof productSchema>;

interface AddProductDialogProps {
  children: React.ReactNode;
  onProductAdded?: () => void;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({
  children,
  onProductAdded,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      discount: 0,
      brand: "",
      categoryName: "",
      images: [],
      variants: [{ size: "", stock: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (imageFiles.length + files.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    const newFiles = [...imageFiles, ...files];
    setImageFiles(newFiles);

    // Create previews
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);

    // Update form with image URLs (in real app, these would be uploaded to server)
    const imageUrls = newFiles.map(
      (_, index) => `image-${Date.now()}-${index}.jpg`
    );
    form.setValue("images", imageUrls);
  };

  const removeImage = (index: number) => {
    const newFiles = imageFiles.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    setImageFiles(newFiles);
    setImagePreviews(newPreviews);

    const imageUrls = newFiles.map((_, i) => `image-${Date.now()}-${i}.jpg`);
    form.setValue("images", imageUrls);
  };

  const addVariant = () => {
    append({ size: "", stock: 0 });
  };

  const removeVariant = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    setIsLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", String(data.price));
      formData.append("discount", String(data.discount));
      formData.append("brand", data.brand);
      formData.append("categoryName", data.categoryName);

      // Append images
      imageFiles.forEach((file) => {
        formData.append("images", file);
      });

      // Append variants (convert to JSON string)
      formData.append("variants", JSON.stringify(data.variants));

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products/create`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Product created successfully!");
      form.reset();
      setImageFiles([]);
      setImagePreviews([]);
      setIsOpen(false);
      onProductAdded?.();
    } catch (error) {
      toast.error("Failed to create product");
      console.error("Error creating product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    { value: "men", label: "Men" },
    { value: "women", label: "Women" },
    { value: "kids", label: "Kids" },
    { value: "accessories", label: "Accessories" },
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Add New Product
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter product name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter brand name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter product description"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (₹) *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="discount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            min="0"
                            max="100"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="categoryName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem
                                key={category.value}
                                value={category.value}
                              >
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Image Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Product Images</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Upload up to 5 images (JPG, PNG, WebP)
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600 mb-2">
                      Click to upload images or drag and drop
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Choose Images
                    </label>
                  </div>

                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Variants */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Product Variants</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Add different sizes and their stock quantities
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center gap-4 p-4 border rounded-lg"
                  >
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`variants.${index}.size`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Size</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select size" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {sizes.map((size) => (
                                  <SelectItem key={size} value={size}>
                                    {size}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`variants.${index}.stock`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Stock Quantity</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="0"
                                min="0"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value) || 0)
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeVariant(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addVariant}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Variant
                </Button>
              </CardContent>
            </Card>

            <Separator />

            {/* Form Actions */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin " />
                    Creating...
                  </>
                ) : (
                  "Create Product"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
