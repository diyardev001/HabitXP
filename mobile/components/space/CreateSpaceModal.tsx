import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';

interface CreateSpaceModalProps {
  isVisible: boolean;
  onClose: () => void;
  onDone: (name: string) => void;
}

const CreateSpaceModal = ({
  isVisible,
  onClose,
  onDone,
}: CreateSpaceModalProps) => {
  const [spaceName, setSpaceName] = useState('');

  const handleDone = () => {
    if (spaceName.trim()) {
      onDone(spaceName);
      onClose();
      setSpaceName('');
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.container}>
          <Text style={styles.title}>Bereich erstellen</Text>

          <TextInput
            style={styles.input}
            placeholder="Name des Bereichs"
            placeholderTextColor="#666"
            value={spaceName}
            onChangeText={setSpaceName}
            autoFocus
            returnKeyType="done"
            onSubmitEditing={handleDone}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.button}>
              <Text style={styles.buttonTextCancel}>Abbrechen</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDone}
              style={styles.button}
              disabled={!spaceName.trim()}
            >
              <Text
                style={[
                  styles.buttonTextDone,
                  !spaceName.trim() && styles.buttonTextDisabled,
                ]}
              >
                Fertig
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    backgroundColor: '#121720',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#1E2530',
    borderRadius: 10,
    padding: 15,
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  buttonTextCancel: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextDone: {
    color: '#9c80d0',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextDisabled: {
    opacity: 0.5,
  },
});

export default CreateSpaceModal;
