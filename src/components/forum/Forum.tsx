"use client";
import { useState } from 'react';
import CollapsiblePostForm from './CollapsiblePostForm';
import ForumPostCard from './ForumPostCard';
import { ForumPost } from '@/types/forum';

// Sample initial posts
const initialPosts: ForumPost[] = [
  {
    id: '1',
    name: 'Ava Chen',
    title: 'Tips for First-Time Gallery Submissions',
    body: `Hi everyone! I'm preparing to submit my work to galleries for the first time and would love some advice. 

What are some common mistakes to avoid? Any tips on preparing your portfolio or writing artist statements? 

I work primarily in oil painting and would appreciate any insights from those who've been through this process.`,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: '2',
    name: 'Anonymous',
    title: 'Digital vs Traditional Art - Your Thoughts?',
    body: `I've been working with both digital and traditional mediums lately, and I'm curious about the community's perspective on this.

Do you think digital art is gaining more acceptance in the fine art world? What are your experiences with collectors' preferences?

I'm particularly interested in how galleries view digital work compared to traditional pieces.`,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
  },
  {
    id: '3',
    name: 'Liam Patel',
    title: 'Finding Inspiration During Creative Blocks',
    body: `I've been struggling with a creative block for the past few weeks and could use some advice.

What do you do when you're feeling uninspired? Any particular techniques or activities that help you get back into the creative flow?

I usually work in mixed media and abstract styles, but lately nothing feels right. Would love to hear how others handle these periods.`,
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
  },
  {
    id: '4',
    name: 'Sophia Rodriguez',
    title: 'Best Practices for Social Media Marketing',
    body: `I'm trying to build my online presence as an artist and would love to hear about your social media strategies.

Which platforms work best for showcasing artwork? Any tips on engaging with followers and building a community?

I'm currently using Instagram and TikTok, but I'm wondering if I should focus on other platforms too.`,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
  },
  {
    id: '5',
    name: 'Marcus Johnson',
    title: 'Pricing Your Artwork - A Discussion',
    body: `I've been struggling with pricing my artwork appropriately. How do you determine the right price point?

Do you consider materials, time, experience, or market demand? Any advice on pricing for different venues (galleries, online, commissions)?

I want to be fair to both myself and potential buyers.`,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
  },
  {
    id: '6',
    name: 'Emma Thompson',
    title: 'Collaboration Opportunities',
    body: `I'm interested in collaborating with other artists on a project. Has anyone done collaborative work before?

What were the challenges and benefits? How did you handle creative differences and credit sharing?

I'm thinking of starting a collaborative series and would love to hear your experiences.`,
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) // 4 days ago
  },
  {
    id: '7',
    name: 'David Kim',
    title: 'Art Supplies on a Budget',
    body: `I'm a student artist looking for quality supplies without breaking the bank. Any recommendations?

Where do you find the best deals on paints, canvases, and other materials? Any brands that offer good quality for the price?

I'm working with acrylics and oils primarily, but open to trying new mediums.`,
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
  },
  {
    id: '8',
    name: 'Isabella Santos',
    title: 'Building a Portfolio Website',
    body: `I'm creating my first portfolio website and could use some advice on what to include.

What sections are essential? How do you showcase your work effectively online? Any platform recommendations?

I want to make sure it represents my work professionally while being easy to navigate.`,
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000) // 6 days ago
  }
];

export default function Forum() {
  const [posts, setPosts] = useState<ForumPost[]>(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const handleSubmitPost = (postData: { name: string; title: string; body: string }) => {
    const newPost: ForumPost = {
      id: Date.now().toString(),
      name: postData.name,
      title: postData.title,
      body: postData.body,
      timestamp: new Date()
    };

    setPosts(prevPosts => [newPost, ...prevPosts]);
    setCurrentPage(1); // Reset to first page when new post is added
  };

  // Calculate pagination
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="py-8 min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Community Forum</h1>
        
        {/* Post Form */}
        <CollapsiblePostForm onSubmit={handleSubmitPost} />
        
        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 my-8"></div>
        </div>
        
        {/* Posts List */}
        <div className="space-y-6">
          {currentPosts.map((post) => (
            <ForumPostCard key={post.id} post={post} />
          ))}
        </div>
        
        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 my-8"></div>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <nav className="flex items-center space-x-2" aria-label="Pagination">
              {/* Previous button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 text-sm font-medium ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-500 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Next button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
} 