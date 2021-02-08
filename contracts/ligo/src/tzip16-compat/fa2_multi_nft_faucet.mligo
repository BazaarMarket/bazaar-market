#include "fa2_multi_nft_token.mligo"
#include "fa2_multi_nft_manager.mligo"

type nft_faucet_entrypoints =
  | Assets of fa2_entry_points
  | Mint of mint_tokens_param

type nft_faucet_storage = {
  assets: nft_token_storage;
  metadata: (string, bytes) big_map; (* contract metadata *)
  }

let nft_faucet_main (param, storage : nft_faucet_entrypoints * nft_faucet_storage)
    : operation list * nft_faucet_storage =
  match param with
  | Assets fa2 ->
     let ops, new_assets = fa2_main (fa2, storage.assets) in
     ops, { storage with assets = new_assets; }
  | Mint mp ->
     let ops, new_assets = mint_tokens (mp, storage.assets) in
     ops, { storage with assets = new_assets; }

let sample_storage : nft_faucet_storage =
  let contents_name = "\"name\":\"example_name\"" in
  let contents_description = "\"description\":\"sample_token\"" in
  let contents_interfaces = "\"interfaces\":[\"TZIP-012\", \"TZIP-016\"]" in
  let contents = Bytes.pack("{" ^ contents_name ^ "," ^ contents_description ^ "," ^ contents_interfaces ^ "}") in
  { assets = { ledger = (Big_map.empty : ledger);
    token_metadata = (Big_map.empty : nft_meta);
    next_token_id = 0n;
    operators = (Big_map.empty : operator_storage);
    };
  metadata = Big_map.literal
               [
                 ("", Bytes.pack "tezos-storage:contents");
                 ("contents", contents)
               ];
  }
