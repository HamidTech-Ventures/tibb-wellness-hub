import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  ShoppingCart, 
  Star, 
  Leaf, 
  Heart,
  Filter,
  Grid,
  List,
  Plus,
  Minus,
  Eye,
  Package,
  Award,
  Shield,
  Truck
} from 'lucide-react';
import Header from '@/components/Header';
import ChatBot from '@/components/ChatBot';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  nameUrdu: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  inStock: boolean;
  image: string;
  benefits: string[];
  ailments: string[];
  dosage: string;
  description: string;
  ingredients: string[];
  manufacturer: string;
  certified: boolean;
  fastDelivery: boolean;
}

const Marketplace = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAilment, setSelectedAilment] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [cart, setCart] = useState<{[key: string]: number}>({});

  const products: Product[] = [
    {
      id: '1',
      name: 'Premium Turmeric Powder',
      nameUrdu: 'اعلیٰ ہلدی پاؤڈر',
      category: 'Herbs & Spices',
      price: 450,
      originalPrice: 600,
      rating: 4.8,
      reviews: 156,
      inStock: true,
      image: '/placeholder.svg',
      benefits: ['Anti-inflammatory', 'Immunity Booster', 'Antioxidant', 'Joint Health'],
      ailments: ['Joint Pain', 'Inflammation', 'Digestive Issues', 'Skin Problems'],
      dosage: '1/2 teaspoon with warm milk, twice daily',
      description: 'Pure, organic turmeric powder sourced from the finest farms. Rich in curcumin for maximum health benefits.',
      ingredients: ['100% Pure Turmeric Root Powder'],
      manufacturer: 'Herbal Solutions Pvt Ltd',
      certified: true,
      fastDelivery: true
    },
    {
      id: '2',
      name: 'Ajwain (Carom Seeds)',
      nameUrdu: 'اجوائن',
      category: 'Seeds',
      price: 280,
      rating: 4.6,
      reviews: 89,
      inStock: true,
      image: '/placeholder.svg',
      benefits: ['Digestive Aid', 'Gas Relief', 'Respiratory Health', 'Weight Loss'],
      ailments: ['Indigestion', 'Bloating', 'Cough', 'Cold'],
      dosage: '1 teaspoon after meals or as directed by Hakeem',
      description: 'High-quality ajwain seeds known for their digestive properties and distinctive aroma.',
      ingredients: ['Premium Carom Seeds'],
      manufacturer: 'Traditional Herbs Co.',
      certified: true,
      fastDelivery: false
    },
    {
      id: '3',
      name: 'Kalonji Oil (Black Seed Oil)',
      nameUrdu: 'کلونجی کا تیل',
      category: 'Oils',
      price: 850,
      originalPrice: 1000,
      rating: 4.9,
      reviews: 234,
      inStock: true,
      image: '/placeholder.svg',
      benefits: ['Immune Support', 'Hair Growth', 'Skin Health', 'Respiratory'],
      ailments: ['Hair Loss', 'Asthma', 'Allergies', 'Skin Conditions'],
      dosage: '1 teaspoon daily on empty stomach',
      description: 'Cold-pressed black seed oil extracted from premium Nigella sativa seeds. Known as the miracle oil.',
      ingredients: ['100% Pure Black Seed Oil'],
      manufacturer: 'Pure Essence Labs',
      certified: true,
      fastDelivery: true
    },
    {
      id: '4',
      name: 'Ginger Powder',
      nameUrdu: 'سونٹھ پاؤڈر',
      category: 'Herbs & Spices',
      price: 320,
      rating: 4.5,
      reviews: 67,
      inStock: true,
      image: '/placeholder.svg',
      benefits: ['Nausea Relief', 'Digestive Health', 'Anti-inflammatory', 'Circulation'],
      ailments: ['Motion Sickness', 'Morning Sickness', 'Arthritis', 'Cold'],
      dosage: '1/4 teaspoon with honey, 2-3 times daily',
      description: 'Dried and powdered ginger root with potent medicinal properties for digestive wellness.',
      ingredients: ['Pure Ginger Root Powder'],
      manufacturer: 'Natural Remedies Ltd',
      certified: false,
      fastDelivery: true
    },
    {
      id: '5',
      name: 'Senna Leaves',
      nameUrdu: 'سنا مکی کے پتے',
      category: 'Medicinal Leaves',
      price: 180,
      rating: 4.3,
      reviews: 45,
      inStock: true,
      image: '/placeholder.svg',
      benefits: ['Natural Laxative', 'Detox', 'Cleansing', 'Weight Loss'],
      ailments: ['Constipation', 'Bloating', 'Digestive Issues'],
      dosage: 'Steep 2-3 leaves in hot water, drink before bed',
      description: 'Premium senna leaves known for their gentle laxative properties and detoxification benefits.',
      ingredients: ['Dried Senna Leaves'],
      manufacturer: 'Herbal Valley',
      certified: true,
      fastDelivery: false
    },
    {
      id: '6',
      name: 'Arq-e-Gulab (Rose Water)',
      nameUrdu: 'عرق گلاب',
      category: 'Distillates',
      price: 650,
      rating: 4.7,
      reviews: 123,
      inStock: true,
      image: '/placeholder.svg',
      benefits: ['Skin Toning', 'Eye Care', 'Cooling Effect', 'Anti-aging'],
      ailments: ['Skin Irritation', 'Eye Strain', 'Heat Rash', 'Acne'],
      dosage: 'Apply externally or add to beverages',
      description: 'Pure rose water distilled from fresh rose petals. Excellent for skin care and internal cooling.',
      ingredients: ['Pure Rose Distillate'],
      manufacturer: 'Rose Garden Co.',
      certified: true,
      fastDelivery: true
    }
  ];

  const categories = ['all', 'Herbs & Spices', 'Seeds', 'Oils', 'Medicinal Leaves', 'Distillates', 'Powders'];
  const ailments = ['all', 'Joint Pain', 'Digestive Issues', 'Skin Problems', 'Hair Loss', 'Constipation', 'Cold'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.nameUrdu.includes(searchTerm) ||
                         product.benefits.some(b => b.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         product.ailments.some(a => a.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesAilment = selectedAilment === 'all' || 
                          product.ailments.some(a => a.toLowerCase().includes(selectedAilment.toLowerCase()));
    
    return matchesSearch && matchesCategory && matchesAilment;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.reviews - a.reviews;
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const addToCart = (productId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to add products to cart.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 0) - 1, 0)
    }));
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 border-sage/20 bg-white h-full">
      <div className="relative">
        <div className="aspect-square bg-sage/10 rounded-t-lg flex items-center justify-center">
          <Package className="w-16 h-16 text-sage/60" />
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {product.originalPrice && (
            <Badge className="bg-red-500 text-white text-xs">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </Badge>
          )}
          {product.certified && (
            <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
              <Shield className="w-3 h-3 mr-1" />
              Certified
            </Badge>
          )}
        </div>

        {product.fastDelivery && (
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
              <Truck className="w-3 h-3 mr-1" />
              Fast
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-foreground group-hover:text-sage transition-colors line-clamp-2">
              {product.name}
            </CardTitle>
            <CardDescription className="text-sage font-medium mt-1 text-sm">
              {product.nameUrdu}
            </CardDescription>
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium ml-1">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
          <Badge variant="outline" className="text-xs border-sage/30 text-sage ml-auto">
            {product.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Benefits */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {product.benefits.slice(0, 2).map((benefit, index) => (
              <Badge key={index} variant="outline" className="text-xs border-green-200 text-green-700 bg-green-50">
                {benefit}
              </Badge>
            ))}
            {product.benefits.length > 2 && (
              <Badge variant="outline" className="text-xs border-sage/30 text-sage">
                +{product.benefits.length - 2}
              </Badge>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-sage">Rs. {product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  Rs. {product.originalPrice}
                </span>
              )}
            </div>
            <div className="text-xs text-muted-foreground">per pack</div>
          </div>
          
          <div className="text-right">
            <div className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {cart[product.id] > 0 ? (
            <div className="flex items-center space-x-2 flex-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeFromCart(product.id)}
                className="w-8 h-8 p-0 border-sage text-sage hover:bg-sage hover:text-white"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium bg-sage/10 px-3 py-1 rounded">
                {cart[product.id]}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addToCart(product.id)}
                className="w-8 h-8 p-0 border-sage text-sage hover:bg-sage hover:text-white"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button 
              className="flex-1 bg-sage hover:bg-dark-sage text-white"
              onClick={() => addToCart(product.id)}
              disabled={!product.inStock}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="sm"
            className="border-sage/30 text-sage hover:bg-sage hover:text-white p-2"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 bg-gradient-to-br from-sage/10 to-earth/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Herbal <span className="text-sage">Marketplace</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover authentic Desi medicines and herbal ingredients sourced from trusted suppliers. 
              Each product comes with detailed usage guidance and health benefits.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search medicines, herbs, remedies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-sage/30 focus:border-sage"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="border-sage/30 focus:border-sage">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedAilment} onValueChange={setSelectedAilment}>
                <SelectTrigger className="border-sage/30 focus:border-sage">
                  <SelectValue placeholder="For Ailment" />
                </SelectTrigger>
                <SelectContent>
                  {ailments.map(ailment => (
                    <SelectItem key={ailment} value={ailment}>
                      {ailment === 'all' ? 'All Ailments' : ailment}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="border-sage/30 focus:border-sage">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              {filteredProducts.length} Products Found
            </h2>
            
            <div className="flex items-center space-x-4">
              {getTotalItems() > 0 && (
                <Button 
                  variant="outline" 
                  className="border-sage text-sage hover:bg-sage hover:text-white"
                  onClick={() => navigate('/cart')}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart ({getTotalItems()})
                </Button>
              )}
              
              <div className="flex items-center border border-sage/30 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-sage text-white' : 'text-sage hover:bg-sage/10'}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-sage text-white' : 'text-sage hover:bg-sage/10'}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-12 h-12 text-sage" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">No Products Found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Try adjusting your search criteria or browse all available products.
              </p>
              <Button 
                variant="outline" 
                className="border-sage text-sage hover:bg-sage hover:text-white"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedAilment('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <ChatBot />
      <Footer />
    </div>
  );
};

export default Marketplace;
