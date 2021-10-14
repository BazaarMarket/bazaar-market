import React from 'react';
import { useLocation } from 'wouter';
import {
  Flex,
  Image,
  Link,
  Text,
} from '@chakra-ui/react';
import footerLogo from './assets/footerLogo.svg';
import { TezosToolkit, MichelCodecPacker } from "@taquito/taquito";
import { ReadOnlySigner, findDex, estimateTezInToken } from "@quipuswap/sdk";
import { RiDiscordLine, RiTwitterLine, RiTelegramLine, RiGithubLine } from 'react-icons/ri';

interface HeaderLinkProps {
  to: string;
  children: React.ReactNode;
}

function TokenPriceDisplay() {
  const publicKeyHash = "tz1fVQangAfb9J1hRRMP2bSB6LvASD6KpY8A";
  const publicKey = "edpkvWbk81uh1DEvdWKR4g1bjyTGhdu1mDvznPUFE2zDwNsLXrEb9K";

  const tezos = new TezosToolkit("https://mainnet.smartpy.io");
  tezos.setPackerProvider(new MichelCodecPacker());
  tezos.setSignerProvider(new ReadOnlySigner(publicKeyHash, publicKey));

  const factories = {
    fa1_2Factory: "KT1Lw8hCoaBrHeTeMXbqHPG4sS4K1xn7yKcD",
    fa2Factory: "KT1SwH9P1Tx8a58Mm6qBExQFTcy2rwZyZiXS",
  };
  
  const token = {
    contract: "KT1GUNKmkrgtMQjJp3XxcmCj6HZBhkUmMbge",
    id: 0,
  };

  const [price, setPrice] = React.useState("");
  React.useEffect(() => {
    const fetchTokenPrice = async () => {
      try {
        const dex = await findDex(tezos, factories, token);
        const dexStorage = await dex.contract.storage();

        const tokenValue = 1_000_0;
        const price = estimateTezInToken(dexStorage, tokenValue);

        setPrice(String(price));

      } catch (err) {  
          setPrice("Could not retrieve token price. Big Sad.");
      }
    }
    fetchTokenPrice();
  }, []);

  return(
    <Flex align="center" textAlign="center">
      <Text fontSize="14px" fontWeight="bold">
        bDAO Token Price:&nbsp;
      </Text>
      <Text fontSize="14px">
        0.{price} tz
      </Text>
    </Flex>
  ); 
}

function FooterLink(props: HeaderLinkProps) {
  const [location, setLocation] = useLocation();
  const selected = location === props.to;
  return (
    <Link
      href={props.to}
      onClick={e => {
        e.preventDefault();
        setLocation(props.to);
      }}
      textDecor="none"
      borderRadius="10px"
      alignItems="center"
      fontWeight="600"
      //px={3}
      //py={2}
      mr={4}
      //bg={selected ? 'brand.blue' : 'white'}
      //color={selected ? 'white' : 'brand.blue'}
      display="flex"
      transition="none"
      _hover={{
        textDecor: 'none',
        //bg: 'gray.700',
        //color: selected ? 'gray.400' : 'gray.100'
      }}
    >
      {props.children}
    </Link>
  );
}

export function Footer() {
  const [location, setLocation] = useLocation();
  /*if (location === '/' || location === '') {
    return null;
  }*/
  return (
    <footer>
      <Flex bg="brand.darkGray" px="2vw" pt="4vh" pb="2vh" color="white" flexDir="column">
        <Flex flexDir="row" justify="space-between" width="100%">
          <Flex flexDir="column">
            <Text fontSize="20px" fontWeight="bold" textAlign="right">
              Sitemap:
            </Text>
            <Link href="/" fontSize="12px" pt="10px">
              Home
            </Link>
            <Link href="/marketplace" fontSize="12px" pt="10px">
              Marketplace
            </Link>
            <Link href="/about" fontSize="12px" pt="10px">
              Contact Us
            </Link>
            <Link href="http://docs.bazaarnft.xyz/" fontSize="12px" pt="10px" pb="2vh">
              Docs
            </Link> 
          </Flex>
          <Flex flexDir="column" textAlign="center">
            <Text fontSize="20px" fontWeight="bold">
              DeFi:
            </Text>
            <Flex mt="2vh" textAlign="center" alignSelf="center" pb="1vh">
              <TokenPriceDisplay/>
            </Flex>
            <Flex flexDir="row" align="center">
              <Link href="https://app.crunchy.network/#/farms" isExternal px="0.5em">
                🚜 Farm
              </Link>  
              <Link href="https://quipuswap.com/swap?from=tez&to=KT1GUNKmkrgtMQjJp3XxcmCj6HZBhkUmMbge_0" isExternal px="0.5em">
                🛒 Buy
              </Link>  
              <Link href="https://quipuswap.com/swap?from=KT1GUNKmkrgtMQjJp3XxcmCj6HZBhkUmMbge_0" isExternal px="0.5em">
                💱 Swap
              </Link>
              <Link href="http://docs.bazaarnft.xyz/en/bdao" isExternal px="0.5em">
                ℹ️ Info
              </Link>
              <Link isExternal px="0.5em" color="lightGray">
                🏛️ DAO
              </Link>
            </Flex>
            <Text fontSize="2vh"  fontWeight="bold" pt="1em"> Donate:</Text>
            <Link fontSize="1.75vh" href="https://app.tezos.domains/domain/bazaar.tez" isExternal flexDir="row">
              <Text color="brand.blue" fontWeight="bold">
                Bazaar.tez
              </Text>
            </Link>
          </Flex>
          <Flex flexDir="column">
            <Text fontSize="20px" fontWeight="bold" textAlign="right">
              Social Links:
            </Text>
            <Flex flexDir="row" mt="2vh">
            <Link href="https://discord.gg/mnYZwv8s5a" isExternal px="0.5em">
              <RiDiscordLine size="2em"/>
            </Link> 
            <Link href="https://t.me/joinchat/L_izbzRXxLNhNTY5" isExternal px="0.5em">
              <RiTelegramLine size="2em"/>
            </Link> 
            <Link href="https://twitter.com/BazaarNfts" isExternal px="0.5em">
              <RiTwitterLine size="2em"/>
            </Link>
            <Link href="https://github.com/BazaarMarket/Bazaar-Market" isExternal pl="0.5em">
              <RiGithubLine size="2em"/>
            </Link>
            </Flex>
            <Link href="/tos" textAlign="right" fontSize="12px" pt={6}>
              Terms of Service
            </Link>
            <Link href="/privacy" textAlign="right" fontSize="12px">
              Privacy Policy
            </Link>
          </Flex>
    </Flex>
    <Flex flexDir="row" justify="space-between" width="100%">
      <Image
        width="125px"
        src={footerLogo}
        cursor="pointer"
        align="center"
      />
      <Text>
        Bazaar Market © 2021 McIntyre Industries LLC
      </Text>
    </Flex>
    </Flex>
    </footer>
  );
}

export default Footer;
