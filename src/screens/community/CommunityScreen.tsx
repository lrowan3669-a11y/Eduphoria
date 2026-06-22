import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  StatusBar,
} from 'react-native';
import { Colors, BorderRadius } from '../../utils/theme';
import NeonCard from '../../components/NeonCard';
import NeonButton from '../../components/NeonButton';

interface Post {
  id: string;
  category: string;
  title: string;
  preview: string;
  author: string;
  timeAgo: string;
  likes: number;
  replies: number;
  liked: boolean;
}

const SAMPLE_POSTS: Post[] = [
  {
    id: '1',
    category: 'Harm Reduction',
    title: 'Reminder: Always test your substances with reagent kits',
    preview: 'With fentanyl contamination at an all-time high, this cannot be stressed enough. Fentanyl test strips are cheap and save lives...',
    author: 'Anonymous',
    timeAgo: '2h ago',
    likes: 47,
    replies: 12,
    liked: false,
  },
  {
    id: '2',
    category: 'Integration',
    title: 'How journaling after experiences changed my perspective',
    preview: 'I started using the Reflect section regularly and noticed patterns I never would have seen otherwise. My monthly reviews have been...',
    author: 'Anonymous',
    timeAgo: '5h ago',
    likes: 31,
    replies: 8,
    liked: false,
  },
  {
    id: '3',
    category: 'Education',
    title: 'The importance of set and setting – personal experience',
    preview: 'I cannot overstate how much environment matters. The same substance in a stressful environment vs. a safe one are completely different...',
    author: 'Anonymous',
    timeAgo: '1d ago',
    likes: 89,
    replies: 24,
    liked: true,
  },
  {
    id: '4',
    category: 'Support',
    title: 'Six months sober from alcohol – what helped me',
    preview: 'After years of daily drinking, I finally got support. Here\'s what actually helped me get through the first 90 days and what didn\'t...',
    author: 'Anonymous',
    timeAgo: '2d ago',
    likes: 124,
    replies: 41,
    liked: false,
  },
  {
    id: '5',
    category: 'Harm Reduction',
    title: 'MDMA safety: The "3 month rule" explained',
    preview: 'Why waiting at least 3 months between MDMA experiences significantly reduces the risk of neurotoxicity and emotional depletion...',
    author: 'Anonymous',
    timeAgo: '3d ago',
    likes: 76,
    replies: 19,
    liked: false,
  },
];

const CATEGORIES = ['All', 'Harm Reduction', 'Education', 'Integration', 'Support', 'General'];

export default function CommunityScreen() {
  const [posts, setPosts] = useState(SAMPLE_POSTS);
  const [selectedCat, setSelectedCat] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState('General');
  const [agreed, setAgreed] = useState(false);

  const filtered = posts.filter(p => selectedCat === 'All' || p.category === selectedCat);

  const toggleLike = (id: string) => {
    setPosts(ps => ps.map(p => p.id === id
      ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
      : p
    ));
  };

  const submitPost = () => {
    if (!postTitle || !postContent || !agreed) return;
    setPosts(ps => [{
      id: Date.now().toString(),
      category: postCategory,
      title: postTitle,
      preview: postContent.slice(0, 120) + '...',
      author: 'Anonymous',
      timeAgo: 'Just now',
      likes: 0,
      replies: 0,
      liked: false,
    }, ...ps]);
    setModalVisible(false);
    setPostTitle('');
    setPostContent('');
    setAgreed(false);
  };

  const catColors: Record<string, string> = {
    'Harm Reduction': Colors.neonGreen,
    'Education': Colors.tropicalTeal,
    'Integration': '#9B59B6',
    'Support': '#FF6B9D',
    'General': Colors.textSecondary,
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>🌐 Community</Text>
          <Text style={styles.subtitle}>Anonymous & judgement free</Text>
        </View>

        {/* Moderation Notice */}
        <View style={styles.section}>
          <NeonCard style={styles.modCard}>
            <Text style={styles.modTitle}>🛡️ Community Guidelines</Text>
            <Text style={styles.modText}>
              This is a safe, anonymous space for harm reduction, education, and support. All posts are moderated.
              No glorification of drug use, no sourcing requests, no identifiable information.
            </Text>
          </NeonCard>
        </View>

        {/* New Post Button */}
        <View style={styles.section}>
          <NeonButton
            label="+ Share Your Experience or Question"
            onPress={() => setModalVisible(true)}
            variant="outline"
          />
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.catScroll}
          contentContainerStyle={styles.catContent}
        >
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.catChip, selectedCat === cat && styles.catChipActive]}
              onPress={() => setSelectedCat(cat)}
            >
              <Text style={[styles.catText, selectedCat === cat && styles.catTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Posts */}
        <View style={styles.postsSection}>
          {filtered.map(post => (
            <TouchableOpacity key={post.id} activeOpacity={0.85}>
              <NeonCard style={styles.postCard}>
                <View style={styles.postHeader}>
                  <View style={[styles.catBadge, { backgroundColor: (catColors[post.category] || Colors.textSecondary) + '22' }]}>
                    <Text style={[styles.catBadgeText, { color: catColors[post.category] || Colors.textSecondary }]}>
                      {post.category}
                    </Text>
                  </View>
                  <Text style={styles.postTime}>{post.timeAgo}</Text>
                </View>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postPreview} numberOfLines={2}>{post.preview}</Text>
                <View style={styles.postFooter}>
                  <Text style={styles.postAuthor}>👤 {post.author}</Text>
                  <View style={styles.postActions}>
                    <TouchableOpacity
                      style={styles.actionBtn}
                      onPress={() => toggleLike(post.id)}
                    >
                      <Text style={[styles.actionIcon, post.liked && { color: Colors.neonGreen }]}>
                        {post.liked ? '♥' : '♡'}
                      </Text>
                      <Text style={[styles.actionCount, post.liked && { color: Colors.neonGreen }]}>
                        {post.likes}
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.actionBtn}>
                      <Text style={styles.actionIcon}>💬</Text>
                      <Text style={styles.actionCount}>{post.replies}</Text>
                    </View>
                  </View>
                </View>
              </NeonCard>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* New Post Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Share Anonymously</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalForm}>
                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Category</Text>
                  <View style={styles.catGrid}>
                    {CATEGORIES.filter(c => c !== 'All').map(cat => (
                      <TouchableOpacity
                        key={cat}
                        style={[styles.catOption, postCategory === cat && styles.catOptionActive]}
                        onPress={() => setPostCategory(cat)}
                      >
                        <Text style={[styles.catOptionText, postCategory === cat && { color: Colors.neonGreen }]}>
                          {cat}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Title</Text>
                  <TextInput
                    style={styles.input}
                    value={postTitle}
                    onChangeText={setPostTitle}
                    placeholder="What do you want to share?"
                    placeholderTextColor={Colors.textMuted}
                  />
                </View>

                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Content</Text>
                  <TextInput
                    style={[styles.input, styles.textarea]}
                    value={postContent}
                    onChangeText={setPostContent}
                    placeholder="Share your experience, question, or insight anonymously..."
                    placeholderTextColor={Colors.textMuted}
                    multiline
                    numberOfLines={5}
                    textAlignVertical="top"
                  />
                </View>

                <TouchableOpacity
                  style={styles.checkRow}
                  onPress={() => setAgreed(!agreed)}
                >
                  <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
                    {agreed && <Text style={styles.checkMark}>✓</Text>}
                  </View>
                  <Text style={styles.agreeText}>
                    My post follows community guidelines. I will not include personal information,
                    requests for sourcing, or content that glorifies unsafe drug use.
                  </Text>
                </TouchableOpacity>

                <NeonButton
                  label="Post Anonymously"
                  onPress={submitPost}
                  disabled={!postTitle || !postContent || !agreed}
                  style={{ marginTop: 4 }}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: { paddingHorizontal: 16, paddingTop: 56, paddingBottom: 16 },
  title: { fontSize: 28, fontWeight: '900', color: Colors.textPrimary },
  subtitle: { color: Colors.textSecondary, fontSize: 13, marginTop: 4 },
  section: { paddingHorizontal: 16, marginBottom: 16 },
  modCard: { backgroundColor: 'rgba(0,229,204,0.06)', borderColor: Colors.borderTeal, gap: 8 },
  modTitle: { color: Colors.tropicalTeal, fontSize: 14, fontWeight: '700' },
  modText: { color: Colors.textSecondary, fontSize: 13, lineHeight: 19 },
  catScroll: { maxHeight: 48, marginBottom: 12 },
  catContent: { paddingHorizontal: 16, gap: 8 },
  catChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderMuted,
    borderRadius: BorderRadius.full,
  },
  catChipActive: { backgroundColor: Colors.neonGreenDim, borderColor: Colors.borderGreen },
  catText: { color: Colors.textMuted, fontSize: 13, fontWeight: '600' },
  catTextActive: { color: Colors.neonGreen },
  postsSection: { paddingHorizontal: 16, gap: 10 },
  postCard: { gap: 8 },
  postHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  catBadge: { borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3 },
  catBadgeText: { fontSize: 11, fontWeight: '700' },
  postTime: { color: Colors.textMuted, fontSize: 11 },
  postTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  postPreview: { color: Colors.textSecondary, fontSize: 13, lineHeight: 19 },
  postFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  postAuthor: { color: Colors.textMuted, fontSize: 12 },
  postActions: { flexDirection: 'row', gap: 16 },
  actionBtn: { flexDirection: 'row', gap: 4, alignItems: 'center' },
  actionIcon: { color: Colors.textSecondary, fontSize: 16 },
  actionCount: { color: Colors.textMuted, fontSize: 13 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  modal: {
    backgroundColor: Colors.bgCard,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '90%',
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary },
  modalClose: { color: Colors.textMuted, fontSize: 18 },
  modalForm: { gap: 16 },
  field: { gap: 8 },
  fieldLabel: { color: Colors.textSecondary, fontSize: 13, fontWeight: '600' },
  catGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  catOption: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: Colors.bgSurface,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.borderMuted,
  },
  catOptionActive: { backgroundColor: Colors.neonGreenDim, borderColor: Colors.borderGreen },
  catOptionText: { color: Colors.textMuted, fontSize: 13, fontWeight: '600' },
  input: {
    backgroundColor: Colors.bgSurface,
    borderWidth: 1,
    borderColor: Colors.borderMuted,
    borderRadius: BorderRadius.md,
    color: Colors.textPrimary,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
  },
  textarea: { minHeight: 120, textAlignVertical: 'top' },
  checkRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: Colors.borderGreen,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 2,
  },
  checkboxChecked: { backgroundColor: Colors.neonGreen, borderColor: Colors.neonGreen },
  checkMark: { color: Colors.bg, fontWeight: '900', fontSize: 13 },
  agreeText: { flex: 1, color: Colors.textSecondary, fontSize: 12, lineHeight: 18 },
});
