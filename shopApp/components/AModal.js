import { View, Text, StyleSheet,TouchableOpacity,Modal,ActivityIndicator } from 'react-native';

function AModal({
    title,
    body,
    cancleText,
    submitText,
    onSubmit,
    onCancle,
    modalVisible,
    loading
})
{
    const modalHeader = (
        <View style={styles.modalHeader}>
            <Text style={styles.title}>{ title }</Text>
            <View style={styles.divider}></View>
        </View>
    );

    const modalBody = (
        <View style={styles.modalBody}>
            {body}
            {(loading) ? <ActivityIndicator size="large" /> : ''}
        </View>
    );
    
    const modalFooter = (
        <View style={styles.modalFooter}>
            <TouchableOpacity style={{ ...styles.actions, backgroundColor: "#db2828" }}
                onPress={onCancle}>
                <Text style={styles.actionText}>{ cancleText }</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ ...styles.actions, backgroundColor: "#21ba45" }}
                onPress={onSubmit}>
                <Text style={styles.actionText}>{ submitText }</Text>
            </TouchableOpacity>
        </View>
    );

    const modalContainer = (
        <View style={styles.modalContainer}>
            {modalHeader}
            {modalBody}
            <View style={styles.divider}></View>
            {modalFooter}
        </View>
    );

  return (
    <Modal
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.modal}>
        <View>
          {modalContainer}
        </View>
      </View>
    </Modal>
    )
}
export default AModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 0,
    },
    modal: {
        backgroundColor: "#00000099",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 12,
        marginBottom: 0,
        height: '100%',
        width: "100%",
    },
    modalContainer: {
        backgroundColor: "#fffafb",
        width: "100%",
        borderRadius: 5,
    },
    modalHeader: {
    
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        padding: 15,
        color: "#000"
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "lightgray"
    },
    modalBody: {
        backgroundColor: "#F8F8F8",
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    modalFooter: {
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: "#F8F8F8",
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    
    },
    actions: {
        borderRadius: 5,
        marginHorizontal: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#F8F8F8",
        minWidth: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionText: {
        color: "#fff"
    }
});
