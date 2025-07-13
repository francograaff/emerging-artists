"use client";
import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ForumPost, Reply } from '@/types/forum';
import ReplyModal from '@/components/forum/ReplyModal';

// Sample posts data (in a real app, this would come from an API)
const samplePosts: ForumPost[] = [
  {
    id: '1',
    name: 'Ava Chen',
    title: 'Tips for First-Time Gallery Submissions',
    body: `Hi everyone! I'm preparing to submit my work to galleries for the first time and would love some advice. 

What are some common mistakes to avoid? Any tips on preparing your portfolio or writing artist statements? 

I work primarily in oil painting and would appreciate any insights from those who've been through this process.

I've been researching different galleries and their submission requirements, but I'm still feeling a bit overwhelmed. Some galleries ask for specific formats while others are more flexible. How do you decide which galleries to approach first?

Also, I'm curious about the timeline - how long does it typically take to hear back from galleries after submitting your work? I want to manage my expectations appropriately.`,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: '2',
    name: 'Anonymous',
    title: 'Digital vs Traditional Art - Your Thoughts?',
    body: `I've been working with both digital and traditional mediums lately, and I'm curious about the community's perspective on this.

Do you think digital art is gaining more acceptance in the fine art world? What are your experiences with collectors' preferences?

I'm particularly interested in how galleries view digital work compared to traditional pieces.

I've noticed that some collectors are very traditional in their preferences, while others are more open to digital mediums. It seems like the art world is slowly evolving, but there's still a lot of resistance in certain circles.

What are your thoughts on the value proposition of digital art? Do you think it should be priced differently than traditional work?`,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
  },
  {
    id: '3',
    name: 'Liam Patel',
    title: 'Finding Inspiration During Creative Blocks',
    body: `I've been struggling with a creative block for the past few weeks and could use some advice.

What do you do when you're feeling uninspired? Any particular techniques or activities that help you get back into the creative flow?

I usually work in mixed media and abstract styles, but lately nothing feels right. Would love to hear how others handle these periods.

I've tried taking breaks, going for walks, looking at other artists' work, but nothing seems to spark that creative energy. It's frustrating because I have deadlines coming up and I feel like I'm letting myself down.

Has anyone found specific techniques that work for them? I'm open to trying anything at this point.`,
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
  },
  {
    id: '4',
    name: 'Sophia Rodriguez',
    title: 'Best Practices for Social Media Marketing',
    body: `I'm trying to build my online presence as an artist and would love to hear about your social media strategies.

Which platforms work best for showcasing artwork? Any tips on engaging with followers and building a community?

I'm currently using Instagram and TikTok, but I'm wondering if I should focus on other platforms too.

I've been posting regularly on Instagram but my engagement has been inconsistent. I'm not sure if it's my content, timing, or something else. I've tried different posting schedules and content types, but I'm still figuring out what works best.

What are your experiences with different platforms? Do you think it's better to focus on one platform and do it really well, or spread your efforts across multiple platforms?`,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
  },
  {
    id: '5',
    name: 'Marcus Johnson',
    title: 'Pricing Your Artwork - A Discussion',
    body: `I've been struggling with pricing my artwork appropriately. How do you determine the right price point?

Do you consider materials, time, experience, or market demand? Any advice on pricing for different venues (galleries, online, commissions)?

I want to be fair to both myself and potential buyers.

I've been using a formula that includes materials cost plus hourly rate, but I'm not sure if that's the right approach. Some artists I know price based on size, others on complexity, and some just go with what feels right.

I'm also curious about how pricing changes as you gain more experience and recognition. Do you adjust your prices regularly, or do you stick with a consistent pricing strategy?`,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
  },
  {
    id: '6',
    name: 'Emma Thompson',
    title: 'Collaboration Opportunities',
    body: `I'm interested in collaborating with other artists on a project. Has anyone done collaborative work before?

What were the challenges and benefits? How did you handle creative differences and credit sharing?

I'm thinking of starting a collaborative series and would love to hear your experiences.

I have a specific project in mind that would benefit from different perspectives and skills. I'm thinking of reaching out to artists whose work I admire, but I'm not sure how to approach the conversation.

What are some best practices for initiating collaborations? How do you ensure everyone feels valued and heard throughout the process?`,
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) // 4 days ago
  },
  {
    id: '7',
    name: 'David Kim',
    title: 'Art Supplies on a Budget',
    body: `I'm a student artist looking for quality supplies without breaking the bank. Any recommendations?

Where do you find the best deals on paints, canvases, and other materials? Any brands that offer good quality for the price?

I'm working with acrylics and oils primarily, but open to trying new mediums.

I've been shopping at the local art store, but their prices seem really high. I've heard about online retailers and bulk buying, but I'm not sure where to start.

What are your favorite budget-friendly brands? Are there any supplies where it's worth spending more for quality, and others where you can save money?`,
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
  },
  {
    id: '8',
    name: 'Isabella Santos',
    title: 'Building a Portfolio Website',
    body: `I'm creating my first portfolio website and could use some advice on what to include.

What sections are essential? How do you showcase your work effectively online? Any platform recommendations?

I want to make sure it represents my work professionally while being easy to navigate.

I've been looking at different website builders and platforms, but I'm overwhelmed by the options. Some seem really expensive, while others look too basic.

What are the most important features for an artist portfolio website? Should I focus on simplicity and let the artwork speak for itself, or include more interactive elements?`,
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000) // 6 days ago
  }
];

// Sample replies data (in a real app, this would come from an API)
const sampleReplies: Reply[] = [
  {
    id: '1',
    postId: '1',
    name: 'Liam Patel',
    body: "Great question! I made several mistakes with my first gallery submissions. The biggest one was not researching the gallery's style and mission before submitting. Make sure your work aligns with what they typically show. Also, don't submit too many pieces - quality over quantity. Most galleries prefer 5-10 strong pieces rather than 20 mediocre ones.",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) // 1 hour ago
  },
  {
    id: '2',
    postId: '1',
    name: 'Sophia Rodriguez',
    body: "I agree with Liam about researching galleries first. Another tip: make sure your images are professional quality. Poor photography can make even great artwork look unprofessional. I invested in professional photos of my work and it made a huge difference in how galleries responded to my submissions.",
    timestamp: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
  },
  {
    id: '3',
    postId: '1',
    name: 'Marcus Johnson',
    body: "Timeline varies a lot. Some galleries respond within a week, others can take 2-3 months. Don't take it personally if you don't hear back - galleries get hundreds of submissions. Keep submitting to multiple places and don't put all your eggs in one basket. Good luck with your submissions!",
    timestamp: new Date(Date.now() - 15 * 60 * 1000) // 15 minutes ago
  },
  {
    id: '4',
    postId: '2',
    name: 'Emma Thompson',
    body: "I think digital art is definitely gaining acceptance, but it depends on the gallery and collector base. Some traditional galleries are still hesitant, but there are more galleries specifically focused on digital and new media art. The key is finding the right audience for your work.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: '5',
    postId: '2',
    name: 'David Kim',
    body: "I work in both digital and traditional mediums. Collectors who are new to art often prefer traditional pieces because they understand the physical value. But younger collectors are much more open to digital work. I think the market is evolving rapidly.",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) // 1 hour ago
  }
];

interface ForumPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ForumPostPage({ params }: ForumPostPageProps) {
  const [post, setPost] = useState<ForumPost | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  
  // Unwrap params using React.use()
  const unwrappedParams = use(params) as { id: string };
  const postId = unwrappedParams.id;

  useEffect(() => {
    // In a real app, this would be an API call
    const foundPost = samplePosts.find(p => p.id === postId);
    setPost(foundPost || null);
    
    // Load replies for this post
    const postReplies = sampleReplies.filter(r => r.postId === postId);
    setReplies(postReplies);
  }, [postId]);

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} day${days === 1 ? '' : 's'} ago`;
    }
  };

  const handleReplySubmit = (replyData: { name: string; body: string }) => {
    // In a real app, this would submit to an API
    console.log('Reply submitted:', replyData);
    
    // Add new reply to the list
    const newReply: Reply = {
      id: Date.now().toString(),
      postId: postId,
      name: replyData.name,
      body: replyData.body,
      timestamp: new Date()
    };
    
    setReplies(prevReplies => [newReply, ...prevReplies]);
    setIsReplyModalOpen(false);
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-2xl mb-4">Post Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The post you're looking for doesn't exist or has been removed.
            </p>
            <Link
              href="/forum"
              className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
            >
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Forum
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Forum Link */}
        <div className="mb-6">
          <Link
            href="/forum"
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Forum
          </Link>
        </div>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 my-8"></div>
        </div>

        {/* Post Content */}
        <article className="bg-white border border-gray-200 p-8 mb-8">
          <header className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white max-w-prose">
                {post.title}
              </h1>
              <time 
                dateTime={post.timestamp.toISOString()}
                className="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0 ml-4"
                title={post.timestamp.toLocaleString()}
              >
                {formatTimestamp(post.timestamp)}
              </time>
            </div>
            <p className="text-lg text-indigo-600 dark:text-indigo-400">
              by {post.name}
            </p>
          </header>
          
          <div className="prose prose-lg max-w-prose">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
              {post.body}
            </p>
          </div>

          {/* Reply Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => setIsReplyModalOpen(true)}
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              Reply
            </button>
          </div>
        </article>

        {/* Replies Section */}
        <section className="bg-white border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Replies ({replies.length})
            </h2>
          </div>
          
          {replies.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No replies yet. Be the first to respond!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {replies.map((reply) => (
                <article key={reply.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {reply.name}
                    </h3>
                    <time 
                      dateTime={reply.timestamp.toISOString()}
                      className="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0 ml-4"
                      title={reply.timestamp.toLocaleString()}
                    >
                      {formatTimestamp(reply.timestamp)}
                    </time>
                  </div>
                  <div className="max-w-prose mx-auto">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ maxWidth: '75ch' }}>
                      {reply.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Reply Modal */}
        <ReplyModal
          isOpen={isReplyModalOpen}
          onClose={() => setIsReplyModalOpen(false)}
          onSubmit={handleReplySubmit}
          postTitle={post.title}
        />
      </div>
    </div>
  );
} 