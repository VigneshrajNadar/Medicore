import React, { useState } from 'react';
import { FaClock, FaUser, FaTag, FaSearch, FaArrowRight } from 'react-icons/fa';
import { healthBlogs, blogCategories } from '../../data/healthBlogs';
import './HealthBlogs.css';

const HealthBlogs = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showArticleModal, setShowArticleModal] = useState(false);

  const openArticle = (blog) => {
    setSelectedArticle(blog);
    setShowArticleModal(true);
  };

  const closeArticle = () => {
    setShowArticleModal(false);
    setTimeout(() => setSelectedArticle(null), 300);
  };

  const filteredBlogs = healthBlogs.filter(blog => {
    const matchesCategory = selectedCategory === 'all' || 
      blog.category.toLowerCase().replace(/['\s]/g, '-') === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredBlogs = healthBlogs.filter(blog => blog.featured);

  return (
    <div className="health-blogs-section">
      {/* Header */}
      <div className="blogs-header">
        <div className="blogs-header-content">
          <h1>Health Blog</h1>
          <p>Expert health advice, wellness tips, and medical insights from our healthcare professionals</p>
        </div>
        
        {/* Search Bar */}
        <div className="blog-search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search articles, topics, or health conditions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Featured Blogs */}
      {selectedCategory === 'all' && !searchQuery && (
        <div className="featured-blogs">
          <h2>Featured Articles</h2>
          <div className="featured-grid">
            {featuredBlogs.map(blog => (
              <div key={blog.id} className="featured-blog-card">
                <div className="featured-image">
                  <img src={blog.image} alt={blog.title} />
                  <span className="featured-badge">Featured</span>
                </div>
                <div className="featured-content">
                  <span className="blog-category">{blog.category}</span>
                  <h3>{blog.title}</h3>
                  <p>{blog.excerpt}</p>
                  <div className="blog-meta">
                    <div className="author-info">
                      <FaUser />
                      <span>{blog.author}</span>
                    </div>
                    <div className="read-time">
                      <FaClock />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                  <button className="read-more-btn" onClick={() => openArticle(blog)}>
                    Read Article <FaArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="category-filter">
        <h3>Browse by Category</h3>
        <div className="category-pills">
          {blogCategories.map(category => (
            <button
              key={category.id}
              className={`category-pill ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* All Blogs Grid */}
      <div className="all-blogs">
        <h2>
          {selectedCategory === 'all' ? 'All Articles' : 
            blogCategories.find(c => c.id === selectedCategory)?.name}
          <span className="blog-count">({filteredBlogs.length})</span>
        </h2>
        
        {filteredBlogs.length > 0 ? (
          <div className="blogs-grid">
            {filteredBlogs.map(blog => (
              <div key={blog.id} className="blog-card">
                <div className="blog-image">
                  <img src={blog.image} alt={blog.title} />
                  <span className="blog-category-badge">{blog.category}</span>
                </div>
                <div className="blog-content">
                  <h4>{blog.title}</h4>
                  <p>{blog.excerpt}</p>
                  
                  <div className="blog-tags">
                    {blog.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        <FaTag /> {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="blog-footer">
                    <div className="author-section">
                      <div className="author-avatar">{blog.author.charAt(0)}</div>
                      <div className="author-details">
                        <span className="author-name">{blog.author}</span>
                        <span className="author-role">{blog.authorRole}</span>
                      </div>
                    </div>
                    <div className="blog-meta-footer">
                      <span className="read-time">
                        <FaClock /> {blog.readTime}
                      </span>
                    </div>
                  </div>
                  
                  <button className="read-article-btn" onClick={() => openArticle(blog)}>
                    Read Full Article <FaArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No articles found</h3>
            <p>Try adjusting your search or browse different categories</p>
          </div>
        )}
      </div>

      {/* Health Tips Banner */}
      <div className="health-tips-banner">
        <div className="tips-content">
          <h3>💡 Stay Informed About Your Health</h3>
          <p>Subscribe to our newsletter for weekly health tips, medical updates, and wellness advice</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email address" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      {/* Article Modal */}
      {showArticleModal && selectedArticle && (
        <div className="article-modal-overlay" onClick={closeArticle}>
          <div className="article-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={closeArticle}>×</button>
            
            <div className="article-modal-header">
              <img src={selectedArticle.image} alt={selectedArticle.title} />
              <div className="article-header-overlay">
                <span className="article-category">{selectedArticle.category}</span>
                <h1>{selectedArticle.title}</h1>
              </div>
            </div>

            <div className="article-modal-content">
              <div className="article-author-section">
                <div className="author-avatar-large">{selectedArticle.author.charAt(0)}</div>
                <div className="author-info-large">
                  <h4>{selectedArticle.author}</h4>
                  <p>{selectedArticle.authorRole}</p>
                  <div className="article-meta-info">
                    <span><FaClock /> {selectedArticle.readTime}</span>
                    <span>•</span>
                    <span>{new Date(selectedArticle.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>

              <div className="article-tags-section">
                {selectedArticle.tags.map((tag, index) => (
                  <span key={index} className="article-tag">
                    <FaTag /> {tag}
                  </span>
                ))}
              </div>

              <div className="article-body">
                <p className="article-excerpt">{selectedArticle.excerpt}</p>
                
                <h2>Understanding the Topic</h2>
                <p>This comprehensive guide provides detailed information about {selectedArticle.title.toLowerCase()}. Our expert medical team has compiled evidence-based insights to help you make informed decisions about your health.</p>

                <h2>Key Takeaways</h2>
                <ul>
                  <li>Evidence-based medical information from certified healthcare professionals</li>
                  <li>Practical tips you can implement in your daily routine</li>
                  <li>Understanding symptoms, causes, and treatment options</li>
                  <li>When to consult with a healthcare provider</li>
                </ul>

                <h2>Expert Recommendations</h2>
                <p>According to {selectedArticle.author}, {selectedArticle.authorRole}, maintaining good health requires a holistic approach. This includes proper nutrition, regular exercise, adequate sleep, and stress management.</p>

                <div className="article-callout">
                  <h3>💡 Important Note</h3>
                  <p>This article is for informational purposes only and should not replace professional medical advice. Always consult with a qualified healthcare provider for diagnosis and treatment.</p>
                </div>

                <h2>Conclusion</h2>
                <p>Taking proactive steps towards better health is essential. By following the guidelines and recommendations in this article, you can work towards improving your overall well-being. Remember to consult with healthcare professionals for personalized advice.</p>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthBlogs;
