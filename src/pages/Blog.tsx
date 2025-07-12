
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  BookOpen, 
  Calendar, 
  User, 
  Clock,
  Heart,
  Share2,
  Bookmark,
  Eye,
  MessageCircle,
  TrendingUp,
  Leaf,
  Stethoscope,
  Coffee,
  Activity
} from 'lucide-react';
import Header from '@/components/Header';
import ChatBot from '@/components/ChatBot';
import Footer from '@/components/Footer';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  publishDate: string;
  readTime: number;
  category: string;
  tags: string[];
  image: string;
  views: number;
  likes: number;
  comments: number;
  featured: boolean;
}

const Blog = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: '10 Essential Herbs Every Pakistani Kitchen Should Have',
      excerpt: 'Discover the healing power of common spices and herbs found in traditional Pakistani kitchens and their incredible health benefits.',
      content: 'Complete guide to essential herbs...',
      author: 'Dr. Ayesha Rahman',
      authorRole: 'Traditional Medicine Expert',
      publishDate: '2024-01-15',
      readTime: 8,
      category: 'Herbal Medicine',
      tags: ['Herbs', 'Kitchen Remedies', 'Wellness', 'Traditional Medicine'],
      image: '/placeholder.svg',
      views: 2540,
      likes: 189,
      comments: 45,
      featured: true
    },
    {
      id: '2',
      title: 'Understanding Mizaj (Temperament) in Tibb-e-Unani',
      excerpt: 'Learn about the four basic temperaments in Unani medicine and how to identify your natural constitution for better health.',
      content: 'Detailed explanation of Mizaj...',
      author: 'Hakeem Muhammad Ali',
      authorRole: 'Senior Unani Practitioner',
      publishDate: '2024-01-12',
      readTime: 12,
      category: 'Traditional Medicine',
      tags: ['Unani Medicine', 'Mizaj', 'Constitution', 'Health Assessment'],
      image: '/placeholder.svg',
      views: 1890,
      likes: 156,
      comments: 23,
      featured: true
    },
    {
      id: '3',
      title: 'Natural Remedies for Digestive Health',
      excerpt: 'Effective traditional remedies for common digestive issues including bloating, acidity, and indigestion using natural ingredients.',
      content: 'Comprehensive guide to digestive health...',
      author: 'Dr. Fatima Malik',
      authorRole: 'Herbal Medicine Specialist',
      publishDate: '2024-01-10',
      readTime: 6,
      category: 'Health Tips',
      tags: ['Digestion', 'Natural Remedies', 'Gut Health', 'Herbal Treatment'],
      image: '/placeholder.svg',
      views: 3120,
      likes: 245,
      comments: 67,
      featured: false
    },
    {
      id: '4',
      title: 'The Power of Honey in Traditional Healing',
      excerpt: 'Explore the medicinal properties of honey and its various applications in traditional medicine for healing and wellness.',
      content: 'Complete guide to honey therapy...',
      author: 'Hakeem Zafar Iqbal',
      authorRole: 'Traditional Healer',
      publishDate: '2024-01-08',
      readTime: 10,
      category: 'Natural Remedies',
      tags: ['Honey', 'Natural Healing', 'Immunity', 'Traditional Medicine'],
      image: '/placeholder.svg',
      views: 1750,
      likes: 132,
      comments: 29,
      featured: false
    },
    {
      id: '5',
      title: 'Seasonal Detox with Traditional Methods',
      excerpt: 'Learn how to cleanse your body naturally using time-tested traditional detox methods suitable for different seasons.',
      content: 'Seasonal detox guide...',
      author: 'Dr. Saima Hussain',
      authorRole: 'Holistic Health Practitioner',
      publishDate: '2024-01-05',
      readTime: 9,
      category: 'Wellness',
      tags: ['Detox', 'Seasonal Health', 'Cleansing', 'Traditional Methods'],
      image: '/placeholder.svg',
      views: 2100,
      likes: 178,
      comments: 34,
      featured: false
    },
    {
      id: '6',
      title: 'Herbal Teas for Mental Wellness',
      excerpt: 'Discover calming herbal teas that can help reduce stress, anxiety, and promote better sleep using traditional recipes.',
      content: 'Guide to herbal teas for mental health...',
      author: 'Dr. Ahmed Hassan',
      authorRole: 'Mind-Body Medicine Expert',
      publishDate: '2024-01-03',
      readTime: 7,
      category: 'Mental Health',
      tags: ['Herbal Tea', 'Mental Wellness', 'Stress Relief', 'Sleep'],
      image: '/placeholder.svg',
      views: 2890,
      likes: 234,
      comments: 56,
      featured: true
    }
  ];

  const categories = ['all', 'Herbal Medicine', 'Traditional Medicine', 'Health Tips', 'Natural Remedies', 'Wellness', 'Mental Health'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const trendingPosts = [...blogPosts].sort((a, b) => b.views - a.views).slice(0, 5);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const BlogCard = ({ post, featured = false }: { post: BlogPost; featured?: boolean }) => (
    <Card className={`group hover:shadow-xl transition-all duration-300 border-sage/20 bg-white h-full ${featured ? 'md:col-span-2' : ''}`}>
      <div className="relative">
        <div className={`${featured ? 'aspect-[2/1]' : 'aspect-video'} bg-sage/10 rounded-t-lg flex items-center justify-center`}>
          <BookOpen className={`${featured ? 'w-16 h-16' : 'w-12 h-12'} text-sage/60`} />
        </div>
        
        <div className="absolute top-3 left-3">
          <Badge className="bg-sage text-white">
            {post.category}
          </Badge>
        </div>
        
        {post.featured && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              Featured
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className={`${featured ? 'p-6' : 'p-4'}`}>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(post.publishDate)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{post.readTime} min read</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{post.views.toLocaleString()}</span>
          </div>
        </div>

        <CardTitle className={`${featured ? 'text-2xl mb-4' : 'text-lg'} font-bold text-foreground group-hover:text-sage transition-colors line-clamp-2`}>
          {post.title}
        </CardTitle>
        
        <CardDescription className={`text-muted-foreground leading-relaxed ${featured ? 'text-base' : 'text-sm'} ${featured ? 'line-clamp-3' : 'line-clamp-2'}`}>
          {post.excerpt}
        </CardDescription>
      </CardHeader>

      <CardContent className={`${featured ? 'p-6 pt-0' : 'p-4 pt-0'} mt-auto`}>
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, featured ? 4 : 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs border-sage/30 text-sage">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Author & Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-sage/20 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-sage" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">{post.author}</div>
              <div className="text-xs text-muted-foreground">{post.authorRole}</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Heart className="w-4 h-4" />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments}</span>
            </div>
          </div>
        </div>

        <Button 
          className="w-full mt-4 bg-sage hover:bg-dark-sage text-white"
          onClick={() => navigate(`/blog/${post.id}`)}
        >
          Read Full Article
        </Button>
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
              Health & <span className="text-sage">Wellness Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the wisdom of traditional medicine, learn about herbal remedies, 
              and stay updated with the latest in holistic healthcare practices.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-3xl mx-auto">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search articles, tips, remedies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-sage/30 focus:border-sage"
                />
              </div>
              
              <div className="flex space-x-2">
                {categories.slice(0, 3).map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? 'bg-sage text-white' : 'border-sage/30 text-sage hover:bg-sage hover:text-white'}
                  >
                    {category === 'all' ? 'All' : category.split(' ')[0]}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3 text-sage" />
                  Featured Articles
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {featuredPosts.slice(0, 2).map((post) => (
                    <BlogCard key={post.id} post={post} featured={true} />
                  ))}
                </div>
              </section>
            )}

            {/* All Posts */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-foreground">
                  Latest Articles ({filteredPosts.length})
                </h2>
                
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <BookOpen className="w-4 h-4" />
                  <span>Updated daily</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-12 h-12 text-sage" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">No Articles Found</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Try adjusting your search terms or browse all categories.
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-sage text-sage hover:bg-sage hover:text-white"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                  >
                    Show All Articles
                  </Button>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {/* Categories */}
              <Card className="border-sage/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center text-foreground">
                    <Leaf className="w-5 h-5 mr-2 text-sage" />
                    Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === category
                            ? 'bg-sage text-white'
                            : 'text-muted-foreground hover:bg-sage/10 hover:text-sage'
                        }`}
                      >
                        {category === 'all' ? 'All Categories' : category}
                        <span className="float-right text-xs opacity-70">
                          ({blogPosts.filter(p => category === 'all' || p.category === category).length})
                        </span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Trending Posts */}
              <Card className="border-sage/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center text-foreground">
                    <TrendingUp className="w-5 h-5 mr-2 text-sage" />
                    Trending Now
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trendingPosts.slice(0, 5).map((post, index) => (
                      <div 
                        key={post.id} 
                        className="flex items-start space-x-3 cursor-pointer group"
                        onClick={() => navigate(`/blog/${post.id}`)}
                      >
                        <div className="w-8 h-8 bg-sage/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-sage">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-foreground group-hover:text-sage transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <div className="flex items-center space-x-2 mt-1 text-xs text-muted-foreground">
                            <Eye className="w-3 h-3" />
                            <span>{post.views.toLocaleString()} views</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card className="border-sage/20 bg-gradient-to-br from-sage/5 to-earth/10">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center text-foreground">
                    <Coffee className="w-5 h-5 mr-2 text-sage" />
                    Weekly Wellness
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get the latest health tips and traditional remedies delivered to your inbox every week.
                  </p>
                  <div className="space-y-3">
                    <Input 
                      type="email" 
                      placeholder="Enter your email"
                      className="border-sage/30 focus:border-sage"
                    />
                    <Button className="w-full bg-sage hover:bg-dark-sage text-white">
                      Subscribe Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <ChatBot />
      <Footer />
    </div>
  );
};

export default Blog;
