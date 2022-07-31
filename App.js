import { StyleSheet, Text, View, Button } from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

const Page = styled.View`
  flex: 1;
  align-items: center;
`;

const HeaderText = styled.Text`
  font-size: 25px;
`;

const Input = styled.TextInput`
  width:90%;
  height:50px
  font-size:18px;
  background-color:#EEE;
  margin-top:20px;
  border-radius:10px;
  padding:10px;

`;
const CalcButton = styled.Button`
  margin-top: 10px;
`;

const ResultArea = styled.View`
  margin-top: 30px;
  background-color: #eee;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

const ResultItemTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const ResultItem = styled.Text`
  font-size: 15px;
  margin-top: 30px;
`;

const PctArea = styled.View`
  flex-direction:row;
  margin:20px;
`
const PctItem = styled.Button``;

export default function App() {
  const [bill, setBill] = useState('');
  const [tip, setTip] = useState(0);
  const [pct, setPct] = useState(10);

  const calc = () => {
    let nBill = parseFloat(bill);

    if (nBill) {
      setTip(nBill * (pct/100));
    }
  };

  useEffect(()=>{
    calc();
  }, [pct]);

  return (
    <SafeAreaView style={styles.page}>
      <Page>
        <HeaderText>Calculadora de Gorjeta</HeaderText>
        <Input
          placeholder="Quanto deu a conta?"
          placeholderTextColor="#000"
          keyboardType="numeric"
          value={bill}
          onChangeText={(n) => setBill(n)}
        />
        <PctArea>
          <PctItem title="5%" onPress={()=>setPct(5)}/>
          <PctItem title="10%" onPress={()=>setPct(10)}/>
          <PctItem title="15%" onPress={()=>setPct(15)}/>
          <PctItem title="20%" onPress={()=>setPct(20)}/>
        </PctArea>
        <CalcButton title={`Calcular ${pct}%`} onPress={calc} />
        {tip > 0 &&
          <ResultArea>
            <ResultItemTitle>Valor da Conta</ResultItemTitle>
            <ResultItem>R$ {parseFloat(bill).toFixed(2)}</ResultItem>
            <ResultItemTitle>Valor da Gorjeta</ResultItemTitle>
            <ResultItem>R$ {tip.toFixed(2)} ({pct}%)</ResultItem>
            <ResultItemTitle>Valor Total</ResultItemTitle>
            <ResultItem>R$ {(parseFloat(bill) + tip).toFixed(2)}</ResultItem>
          </ResultArea>
        }
      </Page>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
