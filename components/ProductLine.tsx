import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Product } from '@/models/product'

const ProductLine = ({ item }: { item: Product }) => {
    return (
        <View key={item.id} style={styles.productRow}>
            {/* <Image
                source={require("/assets/images/" + item.image)}
                style={styles.productImage}
                resizeMode="contain"
            /> */}
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDetail}>Cantidad: {item.quantity}</Text>
            <Text style={styles.productDetail}>Precio/Peso: ${item.price.toFixed(2)}</Text>
        </View>
    )
}

export default ProductLine

const styles = StyleSheet.create({
    productRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3a9e68",
    borderRadius: 14,
    padding: 10,
    marginBottom: 8,
    gap: 8,
  },
  productImage: {
    width: 36,
    height: 36,
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
  },
  productDetail: {
    fontSize: 12,
    color: "#fff",
    marginLeft: 4,
  },
})