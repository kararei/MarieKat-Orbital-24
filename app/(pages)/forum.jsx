import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ForumPage() {
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState('');
  const [commentText, setCommentText] = useState('');
  const [username, setUsername] = useState('');

  const addPost = () => {
    if (postText.trim() && username.trim()) {
      setPosts([...posts, { id: Date.now().toString(), text: postText, username, comments: [] }]);
      setPostText('');
    }
  };

  const addComment = (postId) => {
    if (commentText.trim() && username.trim()) {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          post.comments.push({ id: Date.now().toString(), text: commentText, username });
        }
        return post;
      }));
      setCommentText('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Forum</Text>
      </View>
      <View style={styles.newPostContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={[styles.input, styles.postTextInput]}
          placeholder="What's on your mind?"
          value={postText}
          onChangeText={setPostText}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.postButton} onPress={addPost}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.postText}>{item.text}</Text>
            <FlatList
              data={item.comments}
              keyExtractor={(comment) => comment.id}
              renderItem={({ item: comment }) => (
                <View style={styles.commentContainer}>
                  <Text style={styles.username}>{comment.username}</Text>
                  <Text style={styles.commentText}>{comment.text}</Text>
                </View>
              )}
            />
            <View style={styles.newCommentContainer}>
              <TextInput
                style={styles.input}
                placeholder="Add a comment..."
                value={commentText}
                onChangeText={setCommentText}
              />
              <TouchableOpacity style={styles.commentButton} onPress={() => addComment(item.id)}>
                <Ionicons name="send" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff9f2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff9f2',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  newPostContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  input: {
    padding: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 12,
  },
  postTextInput: {
    minHeight: 80, // Adjust as needed for the input height
    textAlignVertical: 'top', // Ensures multiline text starts from the top
  },
  postButton: {
    backgroundColor: '#f8d2e2',
    borderRadius: 50,
    padding: 12,
    alignItems: 'center',
  },
  postContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  postText: {
    fontSize: 16,
    marginBottom: 8,
  },
  commentContainer: {
    paddingLeft: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  commentText: {
    fontSize: 14,
  },
  newCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  commentButton: {
    backgroundColor: 'blue',
    borderRadius: 50,
    padding: 8,
    marginLeft: 8,
  },
});
