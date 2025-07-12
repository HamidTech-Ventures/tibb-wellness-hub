
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Star, 
  Package,
  Shield,
  Truck,
  ChevronLeft,
  Plus,
  Minus,
  Heart
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data - in real app, fetch based on ID
  const product = {
    id: id,
    name: 'Premium Turmeric Powder',
    nameUrdu: 'اعلیٰ ہلدی پاؤڈر',
    category: 'Herbs & Spices',
    price: 450,
    originalPrice: 600,
    rating: 4.8,
    reviews: 156,
    inStock: true,
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    benefits: ['Anti-inflammatory', 'Immunity Booster', 'Antioxidant', 'Joint Health'],
    ailments: ['Joint Pain', 'Inflammation', 'Digestive Issues', 'Skin Problems'],
    dosage: '1/2 teaspoon with warm milk, twice daily',
    description: 'Pure, organic turmeric powder sourced from the finest farms. Rich in curcumin for maximum health benefits. This premium quality turmeric is carefully processed to retain all its natural properties and therapeutic benefits.',
    ingredients: ['100% Pure Turmeric Root Powder'],
    manufacturer: 'Herbal Solutions Pvt Ltd',
    certified: true,
    fastDelivery: true,
    weight: '500g',
    expiryDate: '2026-12-31',
    storage: 'Store in a cool, dry place away from direct sunlight',
    warnings: ['Consult a physician before use if pregnant', 'May interact with blood thinning medications']
  };

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to add products to cart.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  const reviews = [
    {
      id: 1,
      name: 'Aisha Khan',
      rating: 5,
      comment: 'Excellent quality turmeric! Really helped with my joint pain.',
      date: '1 week ago',
      verified: true
    },
    {
      id: 2,
      name: 'Ahmed Ali',
      rating: 5,
      comment: 'Pure and authentic. Great for boosting immunity.',
      date: '2 weeks ago',
      verified: true
    },
    {
      id: 3,
      name: 'Fatima Sheikh',
      rating: 4,
      comment: 'Good product, fast delivery. Will order again.',
      date: '1 month ago',
      verified: false
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      {/* Back Button */}
      <section className="pt-20 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Button 
            variant="outline" 
            onClick={() => navigate('/marketplace')}
            className="border-sage/30 text-sage hover:bg-sage hover:text-white mb-6"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Marketplace
          </Button>
        </div>
      </section>

      {/* Product Details */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <Card className="border-sage/20 bg-white mb-4">
                <CardContent className="p-6">
                  <div className="aspect-square bg-sage/10 rounded-lg flex items-center justify-center mb-4">
                    <Package className="w-32 h-32 text-sage/60" />
                  </div>
                  
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.originalPrice && (
                      <Badge className="bg-red-500 text-white">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                      </Badge>
                    )}
                    {product.certified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        <Shield className="w-3 h-3 mr-1" />
                        Certified
                      </Badge>
                    )}
                    {product.fastDelivery && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        <Truck className="w-3 h-3 mr-1" />
                        Fast Delivery
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
                <p className="text-xl text-sage font-medium mb-4">{product.nameUrdu}</p>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium ml-2">{product.rating}</span>
                    <span className="text-muted-foreground ml-1">({product.reviews} reviews)</span>
                  </div>
                  <Badge variant="outline" className="border-sage/30 text-sage">
                    {product.category}
                  </Badge>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-sage">Rs. {product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        Rs. {product.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </div>
                </div>
              </div>

              <Card className="border-sage/20 bg-white mb-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">Product Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Weight:</span>
                      <span className="ml-2 font-medium">{product.weight}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Manufacturer:</span>
                      <span className="ml-2 font-medium">{product.manufacturer}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Expiry:</span>
                      <span className="ml-2 font-medium">{new Date(product.expiryDate).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Category:</span>
                      <span className="ml-2 font-medium">{product.category}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center border border-sage/30 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-sage/10 rounded-l-lg"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-sage/10 rounded-r-lg"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <Button 
                  className="bg-sage hover:bg-dark-sage text-white flex-1"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart - Rs. {product.price * quantity}
                </Button>

                <Button variant="outline" className="border-sage/30 text-sage hover:bg-sage hover:text-white p-3">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              {/* Benefits */}
              <Card className="border-sage/20 bg-white mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Health Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {product.benefits.map((benefit, index) => (
                      <Badge key={index} variant="outline" className="border-green-200 text-green-700 bg-green-50 justify-start">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Dosage */}
              <Card className="border-sage/20 bg-white">
                <CardHeader>
                  <CardTitle className="text-lg">Usage & Dosage</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{product.dosage}</p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-medium text-yellow-800 mb-2">Important Notes:</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      {product.warnings.map((warning, index) => (
                        <li key={index}>• {warning}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid lg:grid-cols-2 gap-8 mt-12">
            {/* Description */}
            <Card className="border-sage/20 bg-white">
              <CardHeader>
                <CardTitle>About This Product</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {product.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-medium text-foreground mb-2">Ingredients:</h4>
                  <ul className="text-muted-foreground">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index}>• {ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-foreground mb-2">Helps with:</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.ailments.map((ailment, index) => (
                      <Badge key={index} variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">
                        {ailment}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">Storage:</h4>
                  <p className="text-muted-foreground text-sm">{product.storage}</p>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="border-sage/20 bg-white">
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
                <CardDescription>
                  {product.reviews} reviews with an average rating of {product.rating}/5
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-sage/10 pb-4 last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h5 className="font-medium text-foreground">{review.name}</h5>
                            {review.verified && (
                              <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${
                                  i < review.rating 
                                    ? 'fill-yellow-400 text-yellow-400' 
                                    : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="text-muted-foreground text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;
