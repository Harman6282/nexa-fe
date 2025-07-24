import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PackageX, ArrowLeft, Search } from "lucide-react";

interface ProductNotFoundProps {
  category?: string | null;
  onBackToCategory?: () => void;
  onBrowseAll?: () => void;
  onSearch?: () => void;
  className?: string;
}

export default function ProductNotFound ({
  category = "this category",
  onBackToCategory,
  onBrowseAll,
  onSearch,
  className = "",
}: ProductNotFoundProps) {
  return (
    <div className={`flex items-center justify-center min-h-[400px] lg:min-h-[500px] p-4 lg:p-8 ${className}`}>
      <Card className="w-full max-w-md lg:max-w-2xl xl:max-w-3xl mx-auto">
        <CardContent className="flex flex-col items-center text-center p-6 sm:p-8 lg:p-12 space-y-6 lg:space-y-8">
          {/* Icon */}
          <div className="relative">
            <div className="w-20 h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full bg-muted flex items-center justify-center">
              <PackageX className="w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 text-muted-foreground" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 lg:w-7 lg:h-7 bg-destructive rounded-full flex items-center justify-center">
              <span className="text-destructive-foreground text-xs lg:text-sm font-bold">!</span>
            </div>
          </div>

          {/* Title and Description */}
          <div className="space-y-2 lg:space-y-4">
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-semibold tracking-tight">
              No Products Found
            </h2>
            <p className="text-muted-foreground text-sm lg:text-base xl:text-lg leading-relaxed max-w-2xl">
              We couldn't find any products in{" "}
              <span className="font-medium text-foreground">{category}</span>.
              Try browsing other categories or searching for something specific.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            {onBackToCategory && (
              <Button 
                variant="outline" 
                onClick={onBackToCategory}
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Categories
              </Button>
            )}
            
            {onSearch && (
              <Button 
                variant="secondary" 
                onClick={onSearch}
                className="flex-1"
              >
                <Search className="w-4 h-4 mr-2" />
                Search Products
              </Button>
            )}
            
            {onBrowseAll && (
              <Button 
                onClick={onBrowseAll}
                className="flex-1"
              >
                Browse All Products
              </Button>
            )}
          </div>

          {/* Additional Help Text */}
          <div className="pt-4 border-t border-border w-full">
            <p className="text-xs text-muted-foreground">
              Need help? Contact our support team or check back later for new arrivals.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};