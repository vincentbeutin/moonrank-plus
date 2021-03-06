# moonrank-plus

Add rank to NFT in marketplaces like MagicEden from Moonrank.

![screenshot](screenshot.png)


| Marketplace        | Status           |
|:-------------:|:-------------:|
| MagicEden      | ✅ |
| Alpha.art      | ✅ |
| Solport      | ✅ |
| Solanart      | ⌛️      |
| Solsea | ⌛      |

Get started
-
1. Download Zip from https://github.com/vincentbeutin/moonrank-plus
2. Visit `chrome://extensions/` and turn on "Developer mode"
3. Click "Load unpacked" button and navivigate to the folder you downloaded from GitHub
4. That's it

You can offer me a 🍺 by giving a tip on my Solana wallet :
`EGpjAdfaUX5JqNXGMgP7MR6Hy9T4RxrCDKfvxVgAGVxU`

Follow me on twitter [@vincentbeutin](https://twitter.com/vincentbeutin)


F.A.Q
-
**Rankings are not displayed?**
1. Check that the collection is listed on Moonrank
2. Is the name of the collection on the marketplace different from the one on moonrank?

| MagicEden        | Moonrank           | Status  |
|:-------------:|:-------------:|:-----:|
| unirexcity      | unirex | ❌ |
| apexduck      | apexduck      |   ✅ |
| doge_capital | dogecapital      |    ✅ |

If `nok` you have to edit `magiceden.js`
```
// magiceden name => moonrank name
// add an entry if name is very different
this.collections = {
    "the_infamous_thugbirdz_derivative" : 'infamousthug',
    "angry_bunny_club" : 'angrybunnyclub',
    "degenerate_ape_academy" : 'degenapes',
    "skyline_nft" : 'skyline',
    "unirexcity" : 'unirex',
};
```
