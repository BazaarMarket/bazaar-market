import React, { useEffect, useState } from 'react';
import { Token } from '../../../reducer/slices/collections';
import { useLocation } from 'wouter';
import { IpfsGatewayConfig, ipfsUriToGatewayUrl } from '../../../lib/util/ipfs';
import { TokenMedia } from '../../common/TokenMedia';
import tz from '../../common/assets/tezos-sym.svg';
import { 
  AspectRatio, 
  Tooltip,
  Box, 
  Flex, 
  Text, 
  Heading, 
  Image,
  NumberInput, 
  NumberInputField, 
  NumberInputStepper, 
  NumberIncrementStepper, 
  NumberDecrementStepper, 
  Tag,
  TagLabel,
  TagLeftIcon, } from '@chakra-ui/react';
  import { Square, ChevronRight, Codesandbox, Volume2, RefreshCw, Tag as TagIcon } from 'react-feather';

  import VerificationCheck from '../../common/assets/VerifiedTag.png';
  import ScamCheck from '../../common/assets/ScamTag.png';

interface TokenMediaProps extends Token {
  config: IpfsGatewayConfig;
  maxW?: string;
  class?: string;
}

interface TokenCardProps extends Token {
  config: IpfsGatewayConfig,
}

export default function TokenCard(props: TokenCardProps) {
  const [, setLocation] = useLocation();
  let priceValue: any = 0;
  let auctionType: any = "forSale";
  var verifiedUsers: string[] = [ 
    "jSZtK", "2YnvZ", "PENui", "Puqry", 
    "BJNdn", "ost2P", "pcuk6", "mLWfD", 
    "38zd8", "5CXVj", "FTeCe", "M5chq", 
    "wBHtU", "QVcSw", "1PLCP", "XVrBJ",
    "qfpwN", "E3UNv", "rrGMa", "Yt5su",
    "6BqQU", "6xacQ", "42hxK", "zvTkY",
    "Q7NfT", "XXdnc"  
  ];
  var verifiedUserAliases: string[] = [
    "Yoeshi", "Macgeoffrey", "Bazaar Twitter", "Horium", 
    "Blitzkreate", "SegArt", "NFT HUB Cologne", "MoistZombie", 
    "DrDrooth", "Omiod", "THÖR", "Tezonians", 
    "Stu Sontier", "SOMATiC BITS", "Tsirides", "Flygohr",
    "siberelis", "Raw & Roll", "ArtNode", "BullishArt",
    "James Alec Hardy", "a.i.gardening", "Jeremiah Ketner", "KaTZWorld",
    "Trisant", "Pure Mattness"
  ];
  var userName: string;
  var verifiedUserAlias: string = "";
  var verifiedUser: boolean = false;
  var scamUsers: string[] = [ "gdQfK" ];
  var scamUser: boolean = false;

  for(var i: number = 0; i <= verifiedUsers.length; i++){
    if (props.metadata.minter && props.metadata.minter?.substr(-5) === verifiedUsers[i]){
      verifiedUser = true;
      verifiedUserAlias = verifiedUserAliases[i];
    }
  }

  const src = ipfsUriToGatewayUrl(props.config, props.artifactUri);
  const [errored, setErrored] = useState(false);
  const [obj, setObj] = useState<{ url: string; type: string } | null>(null);
  useEffect(() => {
    (async () => {
      let blob;
      try {
        blob = await fetch(src).then(r => r.blob());
      } catch (e) {
        return setErrored(true);
      }
      setObj({
        url: URL.createObjectURL(blob),
        type: blob.type
      });
    })();
  }, [src]);

  function VerifiedNFT() {
    if(verifiedUser){
      return (
        <Flex>
          <Tooltip hasArrow placement="top" label="Verified NFT" bg="brand.yellow" color="black">
            <Image src={VerificationCheck} width="35px" position="absolute" top="15px" left="15px"/>
          </Tooltip>
        </Flex>
      );
    } else {
      for(var i: number = 0; i <= scamUsers.length; i++){
        if (props.metadata.minter && props.metadata.minter?.substr(-5) === scamUsers[i]){
          scamUser = true;
        }
      }
      if(scamUser){
        return (
          <Flex>
          <Image src={ScamCheck} width="35px" position="absolute" top="15px" left="15px"/>
        </Flex>
        );
      }
    }
    return (
      <></>
    );
  }

  function TokenType() {
    if (props.metadata.symbol) {
      if (props.metadata.symbol == "BATOs") {
        return(
          <>
          <Tag align="left" size="lg" key="md" variant="subtle" color="white" bgColor="brand.blue" mx={3} mt="1vh">
            <TagLeftIcon boxSize="1em" strokeWidth={2} as={TagIcon} />
            <TagLabel>
              BATOs
            </TagLabel>
          </Tag>
          </>
        );
      } else {
        return(
          <>
          <Tag align="left" size="lg" key="md" variant="subtle" color="white" bgColor="brand.blue" mx={3} mt="1vh">
            <TagLeftIcon boxSize="1em" as={Codesandbox} />
            <TagLabel>
              {props.metadata.symbol}
            </TagLabel>
          </Tag>
          </>
        );
      }
    } else {
      if (props.address == "KT1MxGrhSmLPe4W842AutygvuoxUejLJDuWq") {
        return(
          <>
            <Tag align="left" size="lg" key="md" variant="subtle" color="white" bgColor="brand.black" mx={3} mt="1vh">
              <TagLeftIcon boxSize="1em" as={Square} />
              <TagLabel>
                ByteBlock
              </TagLabel>
            </Tag>
          </>
        );
      } else {
        return(
          <>
            <Tag align="left" size="lg" key="md" variant="subtle" color="white" bgColor="brand.green" mx={3} mt="1vh">
              <TagLeftIcon boxSize="1em" strokeWidth={3} as={ChevronRight} />
              <TagLabel>
                OpenMinter
              </TagLabel>
            </Tag>
          </>
        );
      }
    }
  }

  function Resale() {
    if(props.metadata.minter !== props.sale?.seller){
      return(
        <Tag align="left" size="lg" key="md" variant="subtle" color="black" bgColor="brand.yellow" mr="auto" mt="1vh">
          <TagLeftIcon boxSize="1em" as={RefreshCw} />
          <TagLabel>
            Re-Sale
          </TagLabel> 
        </Tag>
      );
    } else {
      return( <></> );
    }
  }

  function SaleType(){
    int: priceValue = props.sale?.price;
    string: auctionType = props.sale?.type;
    
    if(auctionType !== "fixedPrice" && auctionType !== "fixedPriceLegacy") {
      return(
        <Flex
          p={2}  
          px={2}
          py={4}
          mx={2}
          bg="white"
          borderTop="1px solid"
          borderColor="brand.lightGray"
        >
          <Text fontSize="xs" p="2px" width="35%">Current Bid</Text>
          <NumberInput width="97%" size="sm" defaultValue={props.sale?.price} min={props.sale?.price} max={999}>
            <NumberInputField />
            <NumberInputStepper boxSize="1.5em">
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
      );
    }
    return(
      <Flex
        px={2}
        py={4}
        mx={2}
        bg="white"
        borderTop="1px solid"
        borderColor="brand.lightGray"
        justify="space-between"
      >
        <Text fontSize="md">Price:</Text>
        <Flex fontSize="md" fontWeight="600" maxH="20px">
          {props && props.sale && props.sale.price > 0 ? (
            <>
              {props.sale?.price}               
              <img src={tz} alt="" width={10} style={{ display: 'inline-block', paddingLeft: "1px" }}/>
            </>) : (<><Text>Free</Text></>)}
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex
      flexDir="column"
      ratio={1}
      w="100%"
      bg="white"
      borderRadius="30px"
      overflow="hidden"
      boxShadow="0px 0px 8px rgba(0, 0, 0, 0.1)"
      transition="all linear 50ms"
      _hover={{
        cursor: 'pointer',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)'
      }}
      onClick={() =>
        setLocation(`/collection/${props.address}/token/${props.id}`)
      }
    >
      <AspectRatio ratio={4 / 3}>
        <Box bg="linear-gradient(to right bottom, #4ba0d4, #3e95cc, #3089c3, #207ebb, #0973b2)">
          {obj && (/^video\/.*/.test(obj.type)) ? (
            <Flex position="absolute" ml="82%" mt="52%">
              <Volume2 size="25px" color="white"/>
            </Flex>
          ) : ( <></> )}
          <TokenMedia
            {...props}
          />
            <VerifiedNFT/>
        </Box>
      </AspectRatio>
      <Flex
        width="100%"
        px={4}
        py={4}
        flexDir="column"
      >
        <Heading size="sm">{props.title}</Heading>
        {props.metadata.minter === props.sale?.seller ? (        
          <>
          {verifiedUserAlias !== "" ? (
            <>
            <Text fontSize="sm" >By {verifiedUserAlias} </Text>
            </>
          ) : (
            <>
            <Text fontSize="sm" >By {props.metadata.minter?.substr(0, 5)}...{props.metadata.minter?.substr(-5)}</Text>
            </>
          )}
          </>
        ) : (
          <>
          <Text fontSize="sm" >By {props.metadata.minter?.substr(0, 5)}...{props.metadata.minter?.substr(-5)}</Text>
          {verifiedUserAlias !== "" ? (
            <>
            <Text fontSize="sm" >By {verifiedUserAlias} </Text>
            </>
          ) : (
            <></>
          )}
          </>
        )}
        <Flex flexDir="row">
          <TokenType/>
          <Resale/>
        </Flex>
      </Flex>
      <SaleType />
    </Flex>
  );
}
