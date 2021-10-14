import React, { useEffect, useState } from 'react';

import { 
  Box, 
  Container, 
  Text, 
  Flex, 
  Heading, 
  SimpleGrid, 
  Image,
  Tag,
  TagLabel,
  TagLeftIcon,
  Link,
  Spinner,
  Button,
  VisuallyHidden
} from '@chakra-ui/react';
import { Wind, Settings, UserCheck, ExternalLink } from 'react-feather';
import { useSelector, useDispatch } from '../../reducer';
import { getMarketplaceNftsQuery, loadMoreMarketplaceNftsQuery } from '../../reducer/async/queries';
import TokenCard from './TokenCard';
import { VisibilityTrigger } from '../common/VisibilityTrigger';
import { MarketplaceNftLoadingData } from '../../lib/nfts/queries';
import { DonateTezButton } from '../common/modals/DonateModal';
import { GetUserMetadata } from '../../lib/service/api';

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

interface UserPageProps {
  address: string | null;
}

export default function ProfilePage({
  address,
}: UserPageProps) {
  for(var i: number = 0; i <= verifiedUsers.length; i++){
    if (address && address?.substr(-5) === verifiedUsers[i]){
      verifiedUser = true;
      verifiedUserAlias = verifiedUserAliases[i];
    }
  }

  const { system, marketplace: state } = useSelector(s => s);
  const dispatch = useDispatch();

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  useEffect(() => {
    dispatch(getMarketplaceNftsQuery(state.marketplace.address));
  }, [ state.marketplace.address, dispatch ]);

  const loadMore = () => {
    dispatch(loadMoreMarketplaceNftsQuery({}));
  };

  let tokens = state.marketplace.tokens?.filter(
    x=>(
      x.token?.owner == address && x.token?.metadata.minter !== address 
    )).map(x=>x.token!) ?? [];

  function UserName() {
    if (verifiedUserAlias !== "") {
      return(
      <>
        <Heading>{verifiedUserAlias} </Heading>
      </>
      );
    } else {
      return(
        <>
          <Heading>Unknown</Heading>
        </>
        );
    }
  }

  function VerifiedTag() {
    if(verifiedUser){
      return (
        <Flex mt={3}>
          <Tag align="left" size="lg" key="md" variant="subtle" color="black" bgColor="brand.yellow">
            <TagLeftIcon boxSize="1em" as={UserCheck} />
            <TagLabel>
              Verified
            </TagLabel> 
          </Tag>
        </Flex>
      );
    } else {
      return (
        <></>
      );
    }
  }

  function SettingsDonateButton() {
    if (address == system.tzPublicKey){
      return (
        <Flex mt={3}>
          <Link href="https://bazaarnft.xyz/user-settings">
            <Settings color="gray" size="3vh"/>
          </Link>
        </Flex>
      );
    } else {
      if(address){
        return(
          <Flex mt={3}>
            <DonateTezButton artistAddress={address} artistName={verifiedUserAlias}/>
          </Flex>);
      } else {
        return(<></>);
      }
    }
    
  }

  async function GetProfileData(){
    await GetUserMetadata(address).then((data) => {
      const {
        alias,
        description,
        site,
        telegram,
        twitter,
        github,
        reddit,
        instagram,
        logo,
        tzprofile,
      } = data.data
      if (data.data.alias) data.data.alias.setState({ alias })
      if (data.data.description) data.data.description.setState({ description })
      if (data.data.site) data.data.site.setState({ site })
      if (data.data.telegram) data.data.telegram.setState({ telegram })
      if (data.data.twitter) data.data.twitter.setState({ twitter })
      if (data.data.github) data.data.github.setState({ github })
      if (data.data.reddit) data.data.reddit.setState({ reddit })
      if (data.data.instagram) data.data.instagram.setState({ instagram })
      if (data.data.logo) data.data.logo.setState({ logo })
      if (data.data.tzprofile) data.data.tzprofile.setState({ tzprofile })
    })
  }

  return (
    <Flex 
    w="100%"
    flexDir="column">
      <Flex bg="white" minH="33vh" align='center' ml="10vw">
        <Flex flexDir="row" marginLeft={10} width="100vw">
          <Flex bg="brand.brightGray" borderRadius="100%" width="20vh" height="20vh" maxHeight="200px" maxWidth="200px">
          <Image borderRadius="100%" width="100%"
          src={`https://services.tzkt.io/v1/avatars2/${address}`}/>
          </Flex>
          <Flex flexDir="column" pl={4}>
            <UserName/>
            {address}
            <VerifiedTag/>
            <Link
              href={"https://tzkt.io/" + address}
              isExternal
              mt={2}
              color="brand.blue"
            >
              <Flex flexDir="row">
                View on TzKT
                <Flex pl={1}>
                  <ExternalLink size={16}/>
                </Flex>
              </Flex>
            </Link>
            <SettingsDonateButton/>
          </Flex>
        </Flex>
      </Flex>
      <Flex
      bg="brand.brightGray"
      px={5}
      pt={6}
      flexDir="column"
      minH="60vh"
      >
      <Container maxW="100em">
        <Flex
          flex="1"
          w="100%"
          flexDir="column"
          mt="5vh"
        >
          {!state.marketplace.loaded ? (
            <Flex flexDir="column" align="center" flex="1" pt={20}>
              <Spinner size="xl" mb={6} color="gray.300" />
              <Heading size="lg" textAlign="center" color="gray.500">
                Loading...
              </Heading>
            </Flex>
          ) :
            tokens.length === 0 ? (
            <Flex w="100%" flex="1" flexDir="column" align="center">
              <Flex
                px={20}
                py={10}
                bg="gray.200"
                textAlign="center"
                align="center"
                borderRadius="5px"
                flexDir="column"
                fontSize="xl"
                color="gray.400"
                mt={28}
              >
                <Wind />
                <Text fontWeight="600" pt={5}>
                  No tokens to display in this marketplace
                </Text>
              </Flex>
            </Flex>
            ) : (
              <>
                <SimpleGrid columns={{sm: 1, md: 2, lg: 3, xl: 4}} gap={8} pb={8}>
                  <>
                    {
                    tokens.slice(0).map(token => {
                      return (
                        <TokenCard
                          key={`${token.address}-${token.id}`}
                          config={system.config}
                          {...token}
                        />
                      );
                    })}
                    <VisibilityTrigger key={state.marketplace.tokens?.length + ':' + tokens.length} onVisible={loadMore} allowedDistanceToViewport={600}/>
                  </>
                </SimpleGrid>
              </>
          )}
        </Flex>
      </Container>
      </Flex>
    </Flex>
  );
}
