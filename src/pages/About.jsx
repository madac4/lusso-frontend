import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../config';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Founder from '../components/Founder';
import Client from '../components/Client';

function About() {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        axiosInstance
            .get(`/clients`)
            .then((res) => {
                setClients(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="wrapper">
            <Header></Header>
            <main>
                <div className="about-us">
                    <div className="about-us__container">
                        <p>
                            Located in Chisinau, Republic of Moldova, Lusso is where art and tradition meet our passion for beauty. In Lusso, you discover <strong>unique, sophisticated</strong> home gifts designed for a personal touch. Lusso will inspire your most original housewarming gift ideas.
                        </p>
                        <div className="about-us__images">
                            <img src="assets/img/about1.jpg" alt="about" />
                            <img src="assets/img/about2.jpg" alt="about" />
                        </div>
                        <p>
                            Our story, which began in 2018, is one of a constantly growing family of
                            loyal customers, as well as one of discovery: our favorite brands come
                            from all around the world and we are as excited about them as our
                            clients are. Lusso is <strong>the first and only store</strong> to represent such{' '}
                            <strong>high-end brands</strong> of homeware, gifts, accessories and
                            home décor. Our name and reputation are our most important investment.
                            We are the best place in Moldova for{' '}
                            <strong>sophisticated, thoughtful gifts</strong> and want our brand to
                            reflect the high level of our standards.
                        </p>
                        <p>
                            <strong>Our customers know</strong> that Lusso only showcases items from
                            well selected, exclusive and reputable companies of home décor and
                            gifts.
                        </p>
                        <div className="clients">
                            <div className="clients__body">
                                {clients.map((client) => (
                                    <Client key={client.instagram} client={client} />
                                ))}
                            </div>
                        </div>
                        <p>We pride ourselves on our long-lasting and beautiful partnerships.
                            Lusso has also expanded its home decor universe with the works of
                            Moldovan sculptors.
                            Our art collection highlights the pioneer artisans’ signature aesthetic
                            and brings a range of everyday objects that are sculptural, organic and
                            captivating.
                            We care a lot about the aesthetics of the products in our store, their
                            proper positioning and presentation on the shelf. You can see how we
                            handle these aspects in our everyday social media posts.
                            This fits our philosophy of a personalized approach for every customer.
                            For 2022 we aim to grow up together with both old and new partners. To
                            reach even more customers in Moldova.
                            We understand that this is a big responsibility. Nevertheless, we
                            believe that our shared values and vision make us a reliable partner.
                        </p>
                        <Founder />
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default About;
