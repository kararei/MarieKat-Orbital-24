import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db, auth } from '../firebase'; // Import your Firebase Firestore and Auth instances
import { collection, doc, getDoc, addDoc, onSnapshot } from 'firebase/firestore'; // Import Firestore methods
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

export default function ForumPage({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState('');
  const [commentText, setCommentText] = useState('');
  const [inputUsername, setInputUsername] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getUsername = async () => {
      try {
        const uid = auth.currentUser?.uid;
        if (uid) {
          const userDocRef = doc(collection(db, 'users'), uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setInputUsername(userData.username);
          }
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    getUsername();

    const unsubscribe = onSnapshot(collection(db, 'forum'), (snapshot) => {
      const forumPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(forumPosts);
    });

    return () => unsubscribe();
  }, []);

  const addPost = async () => {
    if (postText.trim() && inputUsername.trim()) {
      const newPost = {
        text: postText.trim(),
        username: inputUsername.trim(),
        image: image || null,
        comments: [],
        createdAt: new Date().toISOString(),
      };
      await addDoc(collection(db, 'forum'), newPost);
      setPostText('');
      setImage(null);
    }
  };

  const addComment = async (postId) => {
    if (commentText.trim() && inputUsername.trim()) {
      const newComment = {
        text: commentText.trim(),
        username: inputUsername.trim(),
        createdAt: new Date().toISOString(),
      };

      const postDocRef = doc(db, 'forum', postId);
      const postDoc = await getDoc(postDocRef);

      if (postDoc.exists()) {
        const postData = postDoc.data();
        const updatedComments = [...postData.comments, newComment];
        await postDocRef.update({ comments: updatedComments });
        setCommentText('');
      }
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Forum</Text>
      </View>
      <View style={styles.newPostContainer}>
        <Text style={styles.username}>{inputUsername}</Text>
        <TextInput
          style={[styles.input, styles.postTextInput]}
          placeholder="What's on your mind?"
          value={postText}
          onChangeText={setPostText}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Ionicons name="image" size={24} color="white" />
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
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
            {item.image && <Image source={{ uri: item.image }} style={styles.postImage} />}
            <FlatList
              data={item.comments}
              keyExtractor={(comment, index) => `${item.id}-${index}`}
              renderItem={({ item: comment }) => (
                <View style={styles.commentContainer}>
                  <Text style={styles.commentUsername}>{comment.username}</Text>
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
  username: {
    fontWeight: 'bold',
    color: '#b3005c',
  },
  input: {
    padding: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 12,
  },
  postTextInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  postButton: {
    backgroundColor: '#e91e63',
    borderRadius: 50,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  postContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  postImage: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
  commentContainer: {
    marginTop: 8,
    paddingLeft: 16,
  },
  commentUsername: {
    fontWeight: 'bold',
    color: '#d81b60',
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
  imageButton: {
    backgroundColor: '#e91e63', 
    borderRadius: 50,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
});
