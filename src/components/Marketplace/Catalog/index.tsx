import React, { useEffect } from 'react';
import { 
  Box, 
  Container, 
  Text, 
  Flex, 
  Heading, 
  SimpleGrid, 
  Spinner, 
  Input, 
  InputRightElement, 
  InputGroup, 
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  RadioGroup,
  Stack,
  Radio,
  Tooltip,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button, 
  Switch} from '@chakra-ui/react';
import { Wind, Search, Filter, ArrowRight, ArrowDown, DollarSign, Sliders } from 'react-feather';
import { useSelector, useDispatch } from '../../../reducer';
import { getMarketplaceNftsQuery, loadMoreMarketplaceNftsQuery } from '../../../reducer/async/queries';
import TokenCard from './TokenCard';
import { VisibilityTrigger } from '../../common/VisibilityTrigger';

export default function Catalog() {
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

  let tokens = state.marketplace.tokens?.filter(x=>x.token).map(x=>x.token!) ?? [];

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

  function ShowFilters() {
    
    if (show){
      return (
        <Flex alignSelf="center">
              <Button 
                leftIcon={
                <Box fontSize="12px" fontWeight="bold" width="30px">
                  <Text float="left">A</Text>
                  <Text float="right">Z</Text>
                  <Box>
                    <ArrowRight size="1em"/>
                  </Box>
                  
                </Box>}
                bg="white" 
                borderColor="lightGray" 
                borderWidth="1px" 
                borderRadius="3px" 
                fontWeight="normal"
                m="5px" 
                mb="25px" 
                height="1em" 
                p="15px" >
                Name 
              </Button>
              <Button 
                leftIcon={<ArrowDown size="1em"/>}
                bg="white" 
                borderColor="lightGray" 
                borderWidth="1px" 
                borderRadius="3px" 
                fontWeight="normal"
                m="5px" 
                mb="25px" 
                height="1em" 
                p="15px" >
                Price
              </Button>
              <Button 
                leftIcon={<Sliders size="1em"/>}
                bg="white" 
                borderColor="lightGray" 
                borderWidth="1px" 
                borderRadius="3px" 
                fontWeight="normal"
                m="5px" 
                mb="25px" 
                height="1em" 
                p="15px" >
                Category 
              </Button>
        </Flex>
      );
    }
    return(
      <>
        <Flex mb="25px">
        </Flex>
      </>
    );
  }

  function SearchBar() {
    return(
      <>
      <Flex  alignSelf="center" mt="20px" mb="25px">
      <Box borderColor="lightGray" borderWidth="1px" borderRadius="50px" width="500px" p="5px" pl="10px" bg="white"> 
        <Box float="left" pt="3px">
          <Search color="lightGray"/>
        </Box>
        <Box float="left" pt="4px">
          <InputGroup>
            <Input variant="unstyled" placeholder="Search NFTs..." ml="10px" color="lightGray" width="440px"/>
            <InputRightElement width="4.5rem" float="right">
              <Button h="1.5rem" size="sm" onClick={handleClick} float="right" mb="20px" borderRadius="100px">
                {show ? "Clear" : 
                  <Flex pr="2px">
                    <Box p="2px">
                      <Filter size="1em"/>
                    </Box>
                    Filters
                  </Flex>}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Box>
    </Flex>
    <ShowFilters />
    </>
    );
  }

  const [sliderValue, setSliderValue] = React.useState(200)
  const handleSliderChange = (value: number) => setSliderValue(value)
  const handleNumberChange = (value: string) => setSliderValue(Number(value))

  const [tokenValue, setTokenValue] = React.useState("1")
  const handleRadioChange = (value: string) => setTokenValue(value)

  const [checkedItems, setCheckedItems] = React.useState([false, false])
  const allChecked = checkedItems.every(Boolean)

  return (
    <Flex
      w="100%"
      minH="90vh"
      bg="white"
      px={5}
      pt={6}
      overflowY="scroll"
      justify="start"
      flexDir="column"
    > 
    {/*------ Price Slider ------*/}
      <Flex alignSelf="center">
      <Text mr={5} mt={1} fontWeight="bold">
        Price:
      </Text>
      <Slider 
        aria-label="slider-ex-4"
        defaultValue={200}
        width="30vw"
        onChange={handleSliderChange}
        min={0}
        max={200}
        step={10}
      >
        <SliderTrack bg="blue.100">
          <SliderFilledTrack bg="brand.blue" />
        </SliderTrack>
          <SliderThumb 
            fontSize="sm" 
            boxSize="32px" 
            children={
              sliderValue > 0 ? (
                sliderValue < 200 ? (
                  sliderValue+"ꜩ"
                ) : ("∞ꜩ")
                ) : ("Free")}
          />
      </Slider>
      <NumberInput maxW="100px" ml="2rem" value={sliderValue} onChange={handleNumberChange}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      </Flex>

    {/*------ Token Filter ------*/}
    <Flex alignSelf="center" mt={2}>
      <Text mr={5} fontWeight="bold">
        Tokens:
      </Text>
        <RadioGroup defaultValue={"1"}  value={tokenValue} onChange={handleRadioChange}>
          <Stack direction="row">
            <Radio colorScheme="blue" value="1" cursor="pointer">
              All
            </Radio>
            <Radio colorScheme="blue" value="2" cursor="pointer">
              Bazaar
            </Radio>
            <Radio colorScheme="blue" value="3" cursor="pointer">
              ByteBlock
            </Radio>
            <Radio colorScheme="blue" value="4" cursor="pointer">
              OpenMinter
            </Radio>
          </Stack>
        </RadioGroup>
      </Flex>

      {/*------ Verified Filter ------*/}
      <Flex alignSelf="center" mt={3}>
        <Text mr={5} fontWeight="bold">
          Verified:
        </Text>
      <Switch isChecked={allChecked} onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}/>
      </Flex>

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
                      if (token && token.sale) {
                        if (allChecked) {
                          for(var i: number = 0; i <= verifiedUsers.length; i++){
                            if (token.metadata.minter && token.metadata.minter?.substr(-5) === verifiedUsers[i]){
                              if (token.sale.price <= sliderValue || sliderValue == 100 ){
                                if (tokenValue == "1") {
                                  return (
                                    <TokenCard
                                      key={`${token.address}-${token.id}`}
                                      config={system.config}
                                      {...token}
                                    />
                                  );
                                } else if (tokenValue == "2" && token.metadata.symbol == "BATOs") {
                                  return (
                                    <TokenCard
                                      key={`${token.address}-${token.id}`}
                                      config={system.config}
                                      {...token}
                                    />
                                  );
                                } else if (tokenValue == "3" && token.address == "KT1MxGrhSmLPe4W842AutygvuoxUejLJDuWq") {
                                  return (
                                    <TokenCard
                                      key={`${token.address}-${token.id}`}
                                      config={system.config}
                                      {...token}
                                    />
                                  );
                                } else if (tokenValue == "4" && token.metadata.symbol !== "BATOs" && token.address !== "KT1MxGrhSmLPe4W842AutygvuoxUejLJDuWq") {
                                  return (
                                    <TokenCard
                                      key={`${token.address}-${token.id}`}
                                      config={system.config}
                                      {...token}
                                    />
                                  );
                                }
                              }
                            }
                          }
                        } else {
                          if (token.sale.price <= sliderValue || sliderValue == 100 ){
                            if (tokenValue == "1") {
                              return (
                                <TokenCard
                                  key={`${token.address}-${token.id}`}
                                  config={system.config}
                                  {...token}
                                />
                              );
                            } else if (tokenValue == "2" && token.metadata.symbol == "BATOs") {
                              return (
                                <TokenCard
                                  key={`${token.address}-${token.id}`}
                                  config={system.config}
                                  {...token}
                                />
                              );
                            } else if (tokenValue == "3" && token.address == "KT1MxGrhSmLPe4W842AutygvuoxUejLJDuWq") {
                              return (
                                <TokenCard
                                  key={`${token.address}-${token.id}`}
                                  config={system.config}
                                  {...token}
                                />
                              );
                            } else if (tokenValue == "4" && token.metadata.symbol !== "BATOs" && token.address !== "KT1MxGrhSmLPe4W842AutygvuoxUejLJDuWq") {
                              return (
                                <TokenCard
                                  key={`${token.address}-${token.id}`}
                                  config={system.config}
                                  {...token}
                                />
                              );
                            }
                          }
                        }
                      }
                    })}
                    <VisibilityTrigger key={state.marketplace.tokens?.length + ':' + tokens.length} onVisible={loadMore} allowedDistanceToViewport={600}/>
                  </>
                </SimpleGrid>
              </>
          )}
        </Flex>
      </Container>
    </Flex>
  );
}
