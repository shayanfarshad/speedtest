import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';

import TcpSocket from 'react-native-tcp-socket';

function Soket({ navigation }) {


    const [chatter, setChatter] = useState([])

    function updateChatter(msg) {

        setChatter([...chatter, msg])

    }

    useEffect(() => {
        // const serverPort = Number(9 + (Math.random() * 999).toFixed(0));
        // const serverPort = '27015';
        const serverHost = "87.98.241.203";
        let server;
        let client;
        const unsubscribe = navigation.addListener('focus', (e) => {
            // server = TcpSocket.createServer((socket) => {
            //     updateChatter('server connected on ' + JSON.stringify(socket.address()));

            //     socket.on('data', (data) => {
            //         updateChatter('Server Received: ' + data);
            //         socket.write('Echo server\r\n');
            //     });

            //     socket.on('error', (error) => {
            //         updateChatter('server client error ' + error);
            //     });

            //     socket.on('close', (error) => {
            //         updateChatter('server client closed ' + (error ? error : ''));
            //     });
            // }).listen({ port: 27015, host: serverHost, reuseAddress: true }, (address) => {
            //     updateChatter('opened server on ' + JSON.stringify(address));
            // });

            // server.on('error', (error) => {
            //     updateChatter('Server error ' + error);
            // });

            // server.on('close', () => {
            //     updateChatter('server close');
            // });

            client = TcpSocket.createConnection({
                port: 53,
                host: '8.8.8.8',
                localAddress: "192.168.4.19",
                reuseAddress: true,
                // localPort: 20000,
                // interface: "wifi",
                // tls: trueEW
            }, () => {
                console.log('addr',address)
                updateChatter('opened client on ' + JSON.stringify(address));
                client.write('Hello, server! Love, Client.');
            });

            client.on('data', (data) => {
                updateChatter('Client Received: ' + data);
                // client.destroy(); // kill client after server's response
                // server.close();
            });

            client.on('error', (error) => {
                updateChatter('client error ' + error);
            });

            client.on('close', () => {
                updateChatter('client close');
            });

            server = server;
            client = client;
        })
        return unsubscribe;

    }, [])


    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', (e) => {
            server = null;
            client = null;
        })
        return unsubscribe;

    }, [])



    return (
        <View style={styles.container}>
            {console.log('msg', chatter)}
            {chatter.map((msg, index) => {

                return (
                    <View>
                        <Text key={index} style={styles.welcome}>
                            {msg}
                        </Text>
                    </View>
                );
            })}

        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default Soket;